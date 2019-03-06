import PropTypes from 'prop-types'

export const blogPostShape = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  uniqueSlug: PropTypes.string,
  updatedAt: PropTypes.number,
  virtuals: PropTypes.shape({
    wordCount: PropTypes.number,
    readingTime: PropTypes.number,
    totalClapCount: PropTypes.number,
  }),
  blogUrl: PropTypes.string,
  imageUrl: PropTypes.string,
})

export const themeShape = PropTypes.shape({
  palette: PropTypes.shape({ colors: PropTypes.object }),
})
