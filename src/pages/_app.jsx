import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Manifest from 'next-manifest/manifest'
import MetaTags from '../components/MetaTags';
import Layout from '../components/Layout'
import curiousLittleMouse from '../util/curious-little-mouse';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      return { pageProps }
    }

    return {}
  }

  componentDidMount() {
    curiousLittleMouse();
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <Manifest />

          {/* TODO: https://www.netguru.co/codestories/few-tips-that-will-make-your-pwa-on-ios-feel-like-native */}
        </Head>
        <Layout>
          <MetaTags />
          <React.StrictMode>
            <Component {...pageProps} />
          </React.StrictMode>
        </Layout>
      </Container>
    )
  }
}

export default MyApp
