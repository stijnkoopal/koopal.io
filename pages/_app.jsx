import App, { Container } from 'next/app'
import React from 'react'
import Layout from '../components/Layout'
import Metas from '../components/Metas'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      return { pageProps }
    }

    return {}
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Metas />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default MyApp
