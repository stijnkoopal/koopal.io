import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Manifest from 'next-manifest/manifest'
import MetaTags from './_components/MetaTags';
import Layout from './_components/Layout'
import curiousLittleMouse from './_services/curiousLittleMouse';

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