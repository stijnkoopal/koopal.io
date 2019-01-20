import React from 'react'
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import Color from 'color'
import withResume from '../_components/withResume'

const formatDate = date => (date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }) : 'present');

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

const Circle = styled(Flex)(({ color, theme: { spacing, transitions } }) => ({
  borderRadius: '50%',
  width: '20vh',
  height: '20vh',
  backgroundColor: color,
  zIndex: 2,
  padding: spacing.unit * 2,
  transition: `all ${transitions.duration.short}ms linear`,
  '&:hover': {
    width: '25vh',
    height: '25vh',
  },
}))

const ProjectDescription = styled(Flex)({
  position: 'relative',
})

const ProjectWrapper = styled(Flex)(({ odd, theme: { spacing } }) => ({
  height: '20vh',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: odd ? 'row' : 'row-reverse',
  '& > *:nth-of-type(1), & > *:nth-of-type(3)': {
    width: `calc((100% - ${spacing.unit * 2}px) / 2)`,
  },
  marginTop: spacing.unit,
  [ProjectDescription]: {
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

const darkenColor = color => Color(color).darken(0.4).rgb().toString()

const ChevronWithText = ({ children, color }) => (
  <Chevron color={color}>
    <VerticalChevronText color={darkenColor(color)}>{ children }</VerticalChevronText>
  </Chevron>
)

const Project = ({ project, odd, color }) => (
  <ProjectWrapper odd={odd}>
    <ProjectDates color={color} odd={odd}>
      { formatDate(project.startDate) }
      {' '}
      -
      {' '}
      { formatDate(project.endDate) }
    </ProjectDates>
    <ChevronWithText color={color}>
      {project.via}
    </ChevronWithText>
    <ProjectDescription odd={odd}>
      <ConnectionLine color={color} />
      <Circle color={color}>
        <Logo src={project.entityIconUrl} alt={`${project.entity} logo`} />
      </Circle>
    </ProjectDescription>
  </ProjectWrapper>
)

const ProjectList = styled.div(({ theme: { spacing } }) => ({
  paddingTop: spacing.unit,
  paddingBottom: spacing.unit * 3,
}))

const Resume = ({ resume, theme: { palette: { colors } } }) => {
  const projects = resume.projects.sort((a, b) => (a.startDate < b.startDate ? 1 : -1))

  return (
    <ProjectList>
      { projects.map((project, index) => <Project odd={index % 2} key={project.name} project={project} color={colors.visualizations[index]} />)}
    </ProjectList>
  )
}

Resume.pageTitle = 'Resume'

export default withResume(withTheme(Resume))
