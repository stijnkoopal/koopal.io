import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Facebook } from 'react-content-loader'
import styled from 'react-emotion'

export const EmptyBlogPost = ({ uniqueKey }) => <Facebook uniquekey={uniqueKey} />
EmptyBlogPost.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
}

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
  <Fragment>
    <a href={blogPostLink(post)} target="_blank" rel="noopener">
      <BlogImage title={post.title} imageUrl={post.imageUrl} />
      [{blogPostDateTime(post)}]
      {post.title}
    </a>
    <img src="/static/medium-claps.png" alt="Claps" title={`${post.virtuals.totalClapCount} claps received!`} /> {post.virtuals.totalClapCount}
  </Fragment>
)

BlogPost.propTypes = {
  post: blogPostPropType.isRequired,
}

const List = styled('ul')`
  margin: 0;
`

export const LatestBlogPosts = ({ children }) => (
  <List>
    {
      React.Children.map(children, child => <li>{ child }</li>, {})
    }
  </List>
)

LatestBlogPosts.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
}
