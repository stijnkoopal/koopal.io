import React from 'react'
import resume from '../../static/resume.json'

const Projects = () => (
  <ul>
    {resume.projects.map(project => (
      <li>
        { project.name }
        {' '}
        { project.startDate }
        { ' - ' }
        { project.endDate }
        <img style={{ width: '130px' }} src={project.entityIconUrl} alt={`${project.entity} logo`} />
      </li>
    ))}
  </ul>
)

const Resume = () => (
  <div>
    <Projects />
  </div>
)

export default Resume
