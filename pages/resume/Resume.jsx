import React from 'react'
import styled from 'react-emotion'
import withResume from '../_components/withResume'

const formatDate = date => (date ? new Date(date).toLocaleDateString('en-US', { year: '2-digit', month: 'short' }) : 'present');

const Logo = styled('img')({
  width: '100%',
})

const ProjectDates = styled.div(({ color, odd, theme: { spacing } }) => ({
  color,
  boxSizing: 'border-box',
  padding: `0 ${2 * spacing.unit}px`,
  textAlign: odd ? 'right' : 'left',
}))

const ProjectWrapper = styled.div(({ odd, theme: { spacing } }) => ({
  height: '20vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: odd ? 'row' : 'row-reverse',
  '& > :nth-child(1), & > :nth-child(3)': {
    width: `calc((100% - ${spacing.unit * 2}px) / 2)`,
  },
  marginTop: spacing.unit,
}))

const ConnectionLine = styled.div(({ color }) => ({
  height: '2px',
  width: '100%',
  position: 'absolute',
  top: '50%',
  backgroundColor: color,
  zIndex: 1,
}))

const ProjectDescription = styled.div(({ odd }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: odd ? 'flex-end' : 'flex-start',
  height: '100%',
}))

const Circle = styled.div(({ color, theme: { spacing } }) => ({
  display: 'flex',
  borderRadius: '50%',
  width: '20vh',
  height: '20vh',
  backgroundColor: color,
  boxSizing: 'border-box',
  zIndex: 2,
  padding: spacing.unit * 2,
}))

const Chevron = styled.div(({ theme: { spacing }, color }) => ({
  position: 'relative',
  textAlign: 'center',
  paddingLeft: spacing.unit,
  paddingRight: spacing.unit,
  width: 0,
  height: '100%',
  boxSizing: 'border-box',
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

const Project = ({ project, odd, color }) => (
  <ProjectWrapper odd={odd}>
    <ProjectDates color={color} odd={odd}>
      { formatDate(project.startDate) }
      {' '}
      -
      {' '}
      { formatDate(project.endDate) }
    </ProjectDates>
    <Chevron color={color} />
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
}))

const colors = [
  '#f5a34c',
  '#f27074',
  '#47adb9',
  '#a1b973',
  '#7f7f7f',
  '#bbdd31',
  '#1b89e1',
]

const Resume = ({ resume }) => {
  const projects = resume.projects.sort((a, b) => (a.startDate < b.startDate ? 1 : -1))

  return (
    <ProjectList>
      { projects.map((project, index) => <Project odd={index % 2} key={project.name} project={project} color={colors[index]} />)}
    </ProjectList>
  )
}

export default withResume(Resume)
