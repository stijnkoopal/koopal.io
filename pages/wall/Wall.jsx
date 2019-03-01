import React, { useState, useEffect } from 'react'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from './components/LatestBlogPosts'
import fetchMediumPosts from './services/fetchMediumPosts.api'

const renderError = error => <div>{[error.message]}</div>

const Wall = () => {
  const [{posts, isLoading, error}, setFetchState] = useState({posts: [], isLoading: true, error: undefined})

  useEffect(() => {
    fetchMediumPosts()
      .then(posts => setFetchState({posts, isLoading: false, error: undefined}))
      .catch(e => setFetchState({posts: [], isLoading: false, error: e}))
  })

  if (error) {
    return renderError(error)
  }

  const keys = Array(3)
    .fill(0)
    .map((_, i) => String.fromCharCode(65 + i))
  const blogPosts = isLoading
    ? keys.map(key => <EmptyBlogPost key={key} uniqueKey={key} />)
    : posts.map(post => <BlogPost key={post.id} post={post} />)

  return <LatestBlogPosts>{blogPosts}</LatestBlogPosts>
}

export default Wall
