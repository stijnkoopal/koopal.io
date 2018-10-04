import React from 'react'
import styled from 'react-emotion'
import withResume from '../_components/withResume'

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

const Projects = ({ projects }) => (
  <ProjectList>
    { projects.map(project => <ProjectItem key={project.name} project={project} />) }
  </ProjectList>
)

const Resume = ({ resume }) => (
  <Projects projects={resume.projects} />
)

export default withResume(Resume)
