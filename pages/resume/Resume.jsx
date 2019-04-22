import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { Transition } from 'react-transition-group'
import Color from 'color'
import useResume from '../_components/useResume'
import Layout from '../_components/Layout'

const formatDate = date =>
  date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }) : 'present'

const Logo = styled.img({
  width: '80%',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
})

const ProjectDates = styled(Box)(({ color, odd }) => ({
  color,
  textAlign: odd ? 'right' : 'left',
}))

const ConnectionLine = styled.div(({ color }) => ({
  height: '2px',
  width: '100%',
  position: 'absolute',
  top: '50%',
  backgroundColor: color,
}))

const ProjectVisualization = styled(Flex)(({ isOpen, odd, backgroundColor, theme: { spacing, transitions } }) => ({
  position: 'relative',
  borderRadius: isOpen ? '5%' : '50%',
  margin: odd ? `0 0 0 ${spacing.unit}px` : `0 ${spacing.unit}px 0 0`,
  backgroundColor,
  padding: (isOpen ? 1 : 2) * spacing.unit,
  cursor: 'pointer',
  zIndex: isOpen ? 2 : 1,
  transition: `all ${transitions.duration.short}ms linear`,
  '&:before': {
    content: '""',
    display: 'block',
    paddingTop: isOpen ? '50%' : '100%',
    transition: `all ${transitions.duration.short}ms linear`,
  },
  '& > img': {
    position: 'absolute',
  },
}))

const ProjectVisualizationContainer = styled(Flex)({
  position: 'relative',
})

const ProjectWrapper = styled(Flex)(({ chevronPosition, odd, theme: { spacing, transitions } }) => ({
  height: '20vh',
  alignItems: 'center',
  justifyContent: odd ? 'flex-start' : 'flex-end',
  flexDirection: odd ? 'row' : 'row-reverse',
  [`& > *:nth-of-type(${odd ? 1 : 3})`]: {
    transition: `all ${transitions.duration.short}ms linear`,
    width: `calc((100% - ${spacing.unit * 2}px) / ${
      chevronPosition === 'left' ? 2.5 : chevronPosition === 'right' ? 1.5 : 2
    })`,
  },
  [`& > *:nth-of-type(${odd ? 3 : 1})`]: {
    flex: 1,
  },
  marginTop: spacing.unit,
  [ProjectVisualizationContainer]: {
    justifyContent: odd ? 'flex-end' : 'flex-start',
  },
})).withComponent('section')

const Chevron = styled(Box)(({ theme: { spacing }, color }) => ({
  position: 'relative',
  textAlign: 'center',
  width: 0,
  height: '100%',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    background: color,
    transform: 'skew(0deg, -50deg)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    width: '50%',
    background: color,
    transform: 'skew(0deg, 50deg)',
  },
}))

const VerticalChevronText = styled(Box)(({ color }) => ({
  transform: 'rotate(90deg)',
  top: 'calc(50% - 30px)',
  position: 'relative',
  zIndex: 1,
  color,
}))

const darkenColor = color =>
  Color(color)
    .darken(0.4)
    .rgb()
    .toString()

const ChevronWithText = ({ children, color }) => (
  <Chevron color={color} px={2}>
    <VerticalChevronText color={darkenColor(color)}>{children}</VerticalChevronText>
  </Chevron>
)

const ProjectDescription = ({ project }) => (
  <Flex flexDirection="column" p={3}>
    <h2>
      {project.position}@{project.company}
    </h2>
    <div>{project.summary}</div>
  </Flex>
)

const Project = ({ theme: { transitions }, chevronPosition, project, odd, color, isOpen, onClick }) => {
  const visualization = (
    <ProjectVisualization
      odd={odd}
      backgroundColor={color}
      onClick={onClick}
      isOpen={isOpen}
      width={isOpen ? '100%' : ['28vw', '20vw', '12vw']}
    >
      <Transition in={!isOpen} timeout={transitions.duration.short}>
        {state => {
          if (state === 'exited') return <ProjectDescription project={project} />
          else if (state === 'entered') return <Logo src={project.entityIconUrl} alt={`${project.company} logo`} />
          return null
        }}
      </Transition>
    </ProjectVisualization>
  )

  return (
    <ProjectWrapper odd={odd} chevronPosition={chevronPosition}>
      <ProjectDates color={color} odd={odd} px={2}>
        {formatDate(project.startDate)} - {formatDate(project.endDate)}
      </ProjectDates>
      <ChevronWithText color={color}>{project.via}</ChevronWithText>
      <ProjectVisualizationContainer odd={odd}>
        <ConnectionLine color={color} />
        {visualization}
      </ProjectVisualizationContainer>
    </ProjectWrapper>
  )
}

const ProjectList = styled.div(({ theme: { spacing } }) => ({
  paddingTop: spacing.unit,
  paddingBottom: spacing.unit * 3,
}))

const DownloadResume = styled(Flex)(({ theme: { typography, spacing } }) => ({
  ...typography.body1,
  border: '1px solid white',
  background: 'transparent',
  alignContent: 'center',
  padding: 0,
  width: 12 * spacing.unit,
  height: 3 * spacing.unit,
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: spacing.unit,
  textTransform: 'uppercase',
  textDecoration: 'none',
})).withComponent('a')

const Resume = ({ theme }) => {
  const resume = useResume()
  const projects = resume.work
    .filter(({ type }) => type === 'project')
    .sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
  const [selectedProjectIndex, selectProject] = useState(undefined)
  const chevronPosition =
    selectedProjectIndex === undefined ? 'center' : selectedProjectIndex % 2 === 0 ? 'right' : 'left'

  return (
    <Layout>
      <ProjectList>
        {projects.map((project, index) => (
          <Project
            theme={theme}
            chevronPosition={chevronPosition}
            onClick={() => selectProject(selectedProjectIndex === index ? undefined : index)}
            odd={index % 2}
            key={project.company + project.role}
            isOpen={selectedProjectIndex === index}
            project={project}
            color={theme.palette.colors.visualizations[index]}
          />
        ))}
      </ProjectList>

      <DownloadResume
        href="/resume-summary"
        alt="Summary"
      >
        Summary
      </DownloadResume>
    </Layout>
  )
}

Resume.pageTitle = 'Resume'

export default withTheme(Resume)
