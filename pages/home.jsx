import React from 'react'
import styled, { css } from 'react-emotion'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from '../components/LatestBlogPosts'

const uid = () => Math.random().toString(36).substring(2);

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      isLoading: true,
    }
  }
  componentDidMount() {
    fetch('/.netlify/functions/fetchMediumPosts')
      .then(response => response.json())
      .then(posts => this.setState({ posts, isLoading: false }))
      .catch(console.error)
  }

  render() {
    const posts = this.state.isLoading
      ? new Array(3).fill(0).map(() => <EmptyBlogPost key={uid()} />)
      : this.state.posts.map(post => <BlogPost key={post.id} post={post} />)

    return (
      <LatestBlogPosts>
        {posts}
      </LatestBlogPosts>
    )
  }
}

export default Home
