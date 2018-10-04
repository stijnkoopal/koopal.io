import React from 'react'
import PropTypes from 'prop-types'
import { Facebook } from 'react-content-loader'
import styled from 'react-emotion'
import { Flex } from 'grid-styled/emotion'
import { blogPostShape } from '../prop-types'

export const EmptyBlogPost = ({ uniqueKey }) => <Facebook uniquekey={uniqueKey} />
EmptyBlogPost.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
}

const blogPostLink = ({ blogUrl }) => blogUrl
const blogPostDateTime = ({ updatedAt }) => {
  const date = new Date(updatedAt)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

const BlogImage = ({ title, imageUrl }) => <img title={title} alt="Preview" src={imageUrl} />
BlogImage.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

export const BlogPost = ({ post }) => (
  <Flex>
    <a href={blogPostLink(post)} target="_blank" rel="noopener noreferrer">
      <BlogImage title={post.title} imageUrl={post.imageUrl} />
      {blogPostDateTime(post)}
      {post.title}
    </a>
    <img src="/static/medium-claps.png" alt="Claps" title={`${post.virtuals.totalClapCount} claps received!`} />
    {post.virtuals.totalClapCount}
  </Flex>
)

BlogPost.propTypes = {
  post: blogPostShape.isRequired,
}

const List = styled.ul`
  margin: 0;
  list-style: none;
`

export const LatestBlogPosts = ({ children }) => (
  <List>
    {
      React.Children.map(children, child => (
        <li>
          { child }
        </li>
      ), {})
    }
  </List>
)

LatestBlogPosts.propTypes = {
  children: PropTypes.node.isRequired,
}
