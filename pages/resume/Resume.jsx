import React from 'react'
import styled from 'react-emotion'
import resume from '../../static/resume.json'

const EntityLogoImg = styled('img')`
  width: 130px
`

const EntityLogo = ({ project }) => (
  <EntityLogoImg src={project.entityIconUrl} alt={`${project.entity} logo`} />
)

const ProjectList = styled('ul')`
  margin-top: 0;
`

const ProjectItem = ({ project }) => (
  <li>
    { project.name }
    {' '}
    { project.startDate }
    { ' - ' }
    { project.endDate }
    <EntityLogo project={project} />
  </li>
)

const Projects = () => (
  <ProjectList>
    {resume.projects.map(project => <ProjectItem key={project.name} project={project} />)}
  </ProjectList>
)

const Resume = () => (
  <Projects />
)

export default Resume
