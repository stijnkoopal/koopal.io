import React from 'react'
import PropTypes from 'prop-types'
import withResume from '../_components/withResume'

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

const Contact = ({ resume }) => (
  <div>
    { resume.basics.profiles.map(profile => <SingleProfile key={profile.key} {...profile} />) }
  </div>
)

Contact.propTypes = {
  resume: PropTypes.object,
}

Contact.defaultProps = {
  resume: {
    basics: {
      profiles: [],
    },
  },
}

export default withResume(Contact)
