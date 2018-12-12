import React from 'react'
import PropTypes from 'prop-types'
import { Facebook } from 'react-content-loader'
import styled, { css } from 'react-emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { blogPostShape } from '../prop-types'

export const EmptyBlogPost = ({ uniqueKey }) => <Facebook uniquekey={uniqueKey} />
EmptyBlogPost.propTypes = {
  uniqueKey: PropTypes.string.isRequired,
}

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime)
  return date.toLocaleString('en', {
    month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

const BlogImage = styled(Box)(() => ({
  width: '100%',
})).withComponent('img')

const PublishingDate = withTheme(({ children, theme: { spacing, typography } }) => (
  <Flex css={{ ...typography.caption, alignItems: 'flex-end' }}>
    <img
      src="/static/agenda.svg"
      alt="Agenda"
      css={{
        width: `${spacing.unit * 2}px`,
        height: `${spacing.unit * 2}px`,
        marginRight: `${spacing.unit}px`
      }}
    />
    { ' ' }
    { children }
  </Flex>
))

const Claps = withTheme(({ numberOfClaps, theme: { typography, palette, spacing } }) => (
  <Flex css={{
    ...typography.body1,
    alignItems: 'center',
    color: palette.colors.primary,
    '& img': {
      width: `${4 * spacing.unit}px`,
      height: `${4 * spacing.unit}px`,
      marginRight: `${spacing.unit}px`,
    },
  }}
  >
    <img src="/static/medium-claps.svg" alt="Claps" title={`${numberOfClaps} claps on medium!`} />
    {' '}
    {numberOfClaps}
  </Flex>
))

const Container = styled(Flex)(({ theme: { spacing } }) => ({
  flexDirection: 'column',
  border: `${spacing.unit / 4}px solid black`,
  background: 'white',
})).withComponent('article')

const Title = styled.h2(({ theme: { palette, typography } }) => ({
  ...typography.heading,
  color: palette.text.contrast,
}))

const Summary = styled.div(({ theme: { palette, typography } }) => ({
  ...typography.body1,
  color: palette.text.contrast,
})).withComponent('section')

const Footer = styled(Flex)(({ theme: { spacing } }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: spacing.unit,
})).withComponent('section')

const Content = styled(Flex)(({ theme: { spacing } }) => ({
  flexDirection: 'column',
  padding: `${spacing.unit}px`,
})).withComponent('section')

const TellMeMore = styled(Flex)(({ theme: { palette, typography } }) => ({
  ...typography.button,
  background: palette.colors.primary,
  border: 'none',
  borderRadius: '4px',
  alignItems: 'center',
  textDecoration: 'none',
})).withComponent('a')

export const BlogPost = ({ post }) => (
  <Container>
    <BlogImage title={post.title} alt="Header image" src={post.imageUrl} />
    <Content>
      <Title>
        {post.title}
      </Title>
      <PublishingDate>
        {formatDateTime(post.updatedAt)}
      </PublishingDate>
      <Summary>
        {post.content.subtitle}
      </Summary>
      <Footer>
        <Claps numberOfClaps={post.virtuals.totalClapCount} />
        <TellMeMore px={2} href={post.blogUrl} target="_blank" rel="noopener noreferrer">
          Tell me more!
        </TellMeMore>
      </Footer>
    </Content>
  </Container>
)

BlogPost.propTypes = {
  post: blogPostShape.isRequired,
}

const BlogList = styled(Box)(({ theme: { spacing } }) => ({
  margin: 0,
  padding: '0 2%',
  boxSizing: 'border-box',
  listStyle: 'none',
  '> *': {
    marginBottom: `${spacing.unit}px`,
  },
})).withComponent('ul')

export const LatestBlogPosts = ({ children }) => (
  <BlogList>
    {
      React.Children.map(children, child => (
        <li>
          { child }
        </li>
      ), {})
    }
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
