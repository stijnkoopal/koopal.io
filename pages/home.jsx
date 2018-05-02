import React from 'react'
import styled, { css } from 'react-emotion'
import WebApp from '../components/web-app'
import LatestBlogPosts from '../components/latest-blog-posts'

class HomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      posts: [],
    }
  }
  componentDidMount() {
    fetch('/.netlify/functions/fetchMediumPosts')
      .then(response => response.json())
      .then(posts => this.setState({ posts }))
      .catch(console.error)
  }

  render() {
    return (
      <WebApp>
        <LatestBlogPosts posts={ this.state.posts } />
      </WebApp>
    )
  }
}

export default HomePage;
