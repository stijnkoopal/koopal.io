import React from 'react'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from './components/LatestBlogPosts'
import fetchMediumPosts from './services/fetchMediumPosts.api'

class Wall extends React.Component {
  state = {
    posts: [],
    isLoading: true,
    error: undefined,
  }

  componentDidMount = async () => {
    try {
      const posts = await fetchMediumPosts()
      this.setState({ posts, isLoading: false, error: undefined })
    } catch (e) {
      this.setState({ posts: [], isLoading: false, error: e })
    }
  }

  renderError = error => <div>{[error.message]}</div>

  render() {
    const { posts, isLoading, error } = this.state

    if (error) {
      return this.renderError(error)
    }

    const keys = Array(3)
      .fill(0)
      .map((_, i) => String.fromCharCode(65 + i))
    const blogPosts = isLoading
      ? keys.map(key => <EmptyBlogPost key={key} uniqueKey={key} />)
      : posts.map(post => <BlogPost key={post.id} post={post} />)

    return <LatestBlogPosts>{blogPosts}</LatestBlogPosts>
  }
}

export default Wall
