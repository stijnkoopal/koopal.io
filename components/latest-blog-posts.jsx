import React from 'react'
import PropTypes from 'prop-types'

const blogPostPropType = PropTypes.shape({
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

const blogPostLink = ({blogUrl}) => blogUrl
const blogPostDateTime = ({ updatedAt }) => {
  const date = new Date(updatedAt)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

const BlogImage = ({ title, imageUrl }) => (
  <img title={title} alt="Preview" src={imageUrl} />
)

BlogImage.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

const BlogPost = ({ post }) => (
  <a href={blogPostLink(post)} target="_blank">
    <BlogImage title={post.title} imageUrl={post.imageUrl} />
    [{blogPostDateTime(post)}]
    {post.title}
    {post.virtuals.totalClapCount}
  </a>
)

BlogPost.propTypes = {
  post: blogPostPropType.isRequired,
}

const LatestBlogPosts = ({ posts }) => (
  <ul>
    {
      posts.map(post => <li key={ post.id }><BlogPost post={post} /></li>)
    }
  </ul>
)

LatestBlogPosts.propTypes = {
  posts: PropTypes.arrayOf(blogPostPropType).isRequired,
}

export default LatestBlogPosts
