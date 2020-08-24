import { Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Layout from '../_components/Layout'
import LatestBlogPosts, { BlogPost, EmptyBlogPost } from './components/LatestBlogPosts'
import fetchMediumPosts from './services/fetchMediumPosts.api'

const ErrorNotification = withTheme(({ theme: { typography }, error }) => (
  <Flex css={{ ...typography.body1, justifyContent: 'center' }}>
    {error}
  </Flex>
))

const uniquePreconnectUrls = posts => [
  ...new Set(
    posts.map(post => {
      const url = new URL(post.imageUrl)
      return `${url.protocol}//${url.host}`
    }),
  ),
]

const Wall = () => {
  const [{ posts, isLoading, error }, setFetchState] = useState({ posts: [], isLoading: true, error: undefined })

  useEffect(() => {
    fetchMediumPosts()
      .then(posts => setFetchState({ posts, isLoading: false, error: undefined }))
      .catch(e => setFetchState({ posts: [], isLoading: false, error: e }))
  }, [])

  const keys = Array(3)
    .fill(0)
    .map((_, i) => String.fromCharCode(65 + i))

  const blogPosts = isLoading || error
    ? keys.map(key => <EmptyBlogPost key={key} uniqueKey={key} />)
    : posts.map(post => <BlogPost key={post.id} post={post} />)

  const preconnectUrls = isLoading
    ? []
    : uniquePreconnectUrls(posts)

  return (
    <Layout>
      <Head>
        {preconnectUrls.map(url => (
          <link key={url} rel="preconnect" href={url} />
        ))}
      </Head>
      {error && <ErrorNotification error={error.message}></ErrorNotification>}
      {!error && <LatestBlogPosts>{blogPosts}</LatestBlogPosts>}
    </Layout>
  )
}

export default Wall
