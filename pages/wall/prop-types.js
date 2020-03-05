import PropTypes from 'prop-types'

export const blogPostShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.string,
  blogUrl: PropTypes.string,
  imageUrl: PropTypes.string,
})

export const themeShape = PropTypes.shape({
  palette: PropTypes.shape({ colors: PropTypes.object }),
})
