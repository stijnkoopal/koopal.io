import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from './components/LatestBlogPosts'
import fetchMediumPosts from './services/fetchMediumPosts.api'
import Layout from '../_components/Layout'

const renderError = error => <div>{[error.message]}</div>

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

  if (error) {
    return renderError(error)
  }

  const keys = Array(3)
    .fill(0)
    .map((_, i) => String.fromCharCode(65 + i))
  const blogPosts = isLoading
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
      <LatestBlogPosts>{blogPosts}</LatestBlogPosts>
    </Layout>
  )
}

export default Wall
