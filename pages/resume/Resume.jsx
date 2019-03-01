import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import Color from 'color'
import useResume from '../_components/useResume'

const formatDate = date =>
  date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }) : 'present'

const Logo = styled.img({
  width: '100%',
})

const ProjectDates = styled(Box)(({ color, odd, theme: { spacing } }) => ({
  color,
  padding: `0 ${2 * spacing.unit}px`,
  textAlign: odd ? 'right' : 'left',
}))

const ConnectionLine = styled.div(({ color }) => ({
  height: '2px',
  width: '100%',
  position: 'absolute',
  top: '50%',
  backgroundColor: color,
  zIndex: 1,
}))

const ProjectVisualization = styled(Flex)(({ isOpen, odd, backgroundColor, theme: { spacing, transitions } }) => ({
  flexDirection: isOpen ? 'column' : 'row',
  borderRadius: isOpen ? '5%' : '50%',
  width: isOpen ? '100%' : '25vw',
  maxWidth: isOpen ? '99999px' : '200px',
  height: isOpen ? 'unset' : '25vw',
  maxHeight: isOpen ? '99999px' : '200px',
  flex: isOpen ? 1 : 'unset',
  margin: odd ? `0 0 0 ${spacing.unit}px` : `0 ${spacing.unit}px 0 0`,
  backgroundColor,
  zIndex: 2,
  padding: (isOpen ? 1 : 2) * spacing.unit,
  cursor: 'pointer',
  transition: `all ${transitions.duration.short}ms linear`,
  [isOpen ? '' : '&:hover']: {
    width: '25vh',
    height: '25vh',
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
  paddingLeft: spacing.unit,
  paddingRight: spacing.unit,
  width: 0,
  height: '100%',
  ':before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    background: color,
    transform: 'skew(0deg, -50deg)',
  },
  ':after': {
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
  <Chevron color={color}>
    <VerticalChevronText color={darkenColor(color)}>{children}</VerticalChevronText>
  </Chevron>
)

const ProjectDescription = ({ project }) => (
  <>
    <h2>
      {project.name}
      {project.via && ` via ${project.via}`}
    </h2>
    <div>{project.description}</div>
  </>
)

const Project = ({ chevronPosition, project, odd, color, isOpen, onClick }) => {
  const visualization = (
    <ProjectVisualization odd={odd} backgroundColor={color} onClick={onClick} isOpen={isOpen}>
      {!isOpen && <Logo src={project.entityIconUrl} alt={`${project.entity} logo`} />}
      {isOpen && <ProjectDescription project={project} />}
    </ProjectVisualization>
  )

  return (
    <ProjectWrapper odd={odd} chevronPosition={chevronPosition}>
      <ProjectDates color={color} odd={odd}>
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

const Resume = ({
  theme: {
    palette: { colors },
  },
}) => {
  const resume = useResume()
  const projects = resume.projects.sort((a, b) => (a.startDate < b.startDate ? 1 : -1))
  const [selectedProjectIndex, selectProject] = useState(undefined)
  const chevronPosition =
    selectedProjectIndex === undefined ? 'center' : selectedProjectIndex % 2 === 0 ? 'right' : 'left'

  return (
    <ProjectList>
      {projects.map((project, index) => (
        <Project
          chevronPosition={chevronPosition}
          onClick={() => selectProject(selectedProjectIndex === index ? undefined : index)}
          odd={index % 2}
          key={project.name}
          isOpen={selectedProjectIndex === index}
          project={project}
          color={colors.visualizations[index]}
        />
      ))}
    </ProjectList>
  )
}

Resume.pageTitle = 'Resume'

export default withTheme(Resume)
