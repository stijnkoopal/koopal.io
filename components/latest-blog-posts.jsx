import React from 'react'
import PropTypes from 'prop-types'
import { Facebook } from 'react-content-loader'

export const EmptyBlogPost = () => <Facebook />

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

const blogPostLink = ({ blogUrl }) => blogUrl
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

export const BlogPost = ({ post }) => (
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

export const LatestBlogPosts = ({ children }) => (
  <ul>
    {
      React.Children.map(children, child => <li>{ child }</li>, {})
    }
  </ul>
)

LatestBlogPosts.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}
