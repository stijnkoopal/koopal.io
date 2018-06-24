import React from 'react'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import resume from '../static/resume.json'

const CenteredSection = styled('section')`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  padding: 20px;  
  background: rgba(31,199,255,0.24);
  color: #444;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`

const SingleProfile = ({ url, icon, network }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <img src={icon} alt={network} title={`Check out my ${network}`} />
  </a>
)

SingleProfile.propTypes = {
  url: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
}

const UnderConstruction = ({ profiles }) => (
  <CenteredSection>
    <h1>Under construction</h1>
    <h2>But find me here:</h2>

    { profiles.map(profile => <SingleProfile key={profile.key} {...profile} />) }
  </CenteredSection>
)

UnderConstruction.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
}

UnderConstruction.defaultProps = {
  profiles: resume.basics.profiles,
}

export default UnderConstruction
