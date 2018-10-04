import React from 'react'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from './components/LatestBlogPosts'
import fetchMediumPosts from './services/fetchMediumPosts.api'

class Wall extends React.Component {
  state = {
    posts: [],
    isLoading: true,
    error: false,
  }

  componentDidMount = async () => {
    try {
      const posts = await fetchMediumPosts()
      this.setState({ posts, isLoading: false, error: false })
    } catch (_) {
      this.setState({ posts: [], isLoading: false, error: true })
    }
  }

  render() {
    const { posts, isLoading, error } = this.state;

    if (error) {
      return (
        <div>
          Show link to medium here
        </div>
      )
    }

    const keys = Array(3).fill(0).map((_, i) => String.fromCharCode(65 + i))
    const blogPosts = isLoading
      ? keys.map(key => <EmptyBlogPost key={key} uniqueKey={key} />)
      : posts.map(post => <BlogPost key={post.id} post={post} />)

    return (
      <LatestBlogPosts>
        {blogPosts}
      </LatestBlogPosts>
    )
  }
}

export default Wall
