import React from 'react'
import PropTypes from 'prop-types'
import { Facebook } from 'react-content-loader'
import styled from 'react-emotion'
import { blogPostShape } from '../prop-types'

export const EmptyBlogPost = ({ uniqueKey }) => <Facebook uniquekey={uniqueKey} />
EmptyBlogPost.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
}

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime)
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}

const BlogImage = ({ title, imageUrl }) => <img title={title} alt="Preview" src={imageUrl} style={{width: '100%'}} />
BlogImage.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
}

const BlogDateTime = ({ dateTime }) => (
  <>
    {formatDateTime(dateTime)}
  </>
)

const ClapsIcon = ({ numberOfClapsReceived, className }) => (
  <img src="/static/medium-claps.svg" className={className} alt="Claps" title={`${numberOfClapsReceived} claps on medium!`} />
)

const StyledClapsIcon = styled(ClapsIcon)({
  width: '33px',
  height: '33px',
})

const Claps = ({ numberOfClapsReceived} ) => (
  <>
    <StyledClapsIcon numberOfClapsReceived={numberOfClapsReceived} />
    {numberOfClapsReceived}
  </>
)

const BlogAnchor = styled.a(({ theme: { typography } }) => ({
  ...typography.subheading,
}))

export const BlogPost = ({ post }) => (
  <BlogAnchor href={post.blogUrl} target="_blank" rel="noopener noreferrer">
    <BlogImage title={post.title} imageUrl={post.imageUrl} />
    <BlogDateTime dateTime={post.updatedAt} />
    <Claps numberOfClapsReceived={post.virtuals.totalClapCount} />
    {post.title}
  </BlogAnchor>
)

BlogPost.propTypes = {
  post: blogPostShape.isRequired,
}

const BlogList = styled.ul`
  margin: 0;
  padding: 0 2%;
  box-sizing: border-box;
  list-style: none;
`

export const LatestBlogPosts = ({ children }) => (
  <BlogList>
    {
      React.Children.map(children, child => (
        <li>
          { child }
        </li>
      ), {})
    }
  </BlogList>
)

LatestBlogPosts.propTypes = {
  children: PropTypes.node.isRequired,
}
