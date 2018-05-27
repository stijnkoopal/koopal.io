import React from 'react'
import PropTypes from 'prop-types'
import resume from '../static/resume.json'

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

const Contact = ({ profiles }) => (
  <div>
    { profiles.map(profile => <SingleProfile key={profile.key} {...profile} />) }
  </div>
)

Contact.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Contact.defaultProps = {
  profiles: resume.basics.profiles,
}

export default Contact
