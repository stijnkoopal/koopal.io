import React from 'react'
import { LatestBlogPosts, BlogPost, EmptyBlogPost } from '../components/LatestBlogPosts'
import fetchMediumPosts from '../api/fetchMediumPosts.api'

class Wall extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    return fetchMediumPosts()
      .then(posts => this.setState({
        posts,
        isLoading: false,
      }))
  }

  render() {
    const keys = Array(3).fill(0).map((_, i) => String.fromCharCode(65 + i))

    const posts = this.state.isLoading
      ? keys.map(key => <EmptyBlogPost key={key} uniqueKey={key} />)
      : this.state.posts.map(post => <BlogPost key={post.id} post={post} />)

    return (
      <LatestBlogPosts>
        {posts}
      </LatestBlogPosts>
    )
  }
}

export default Wall
