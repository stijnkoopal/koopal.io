import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import Manifest from 'next-manifest/manifest'
import Metas from '../components/Metas';
import Layout from '../components/Layout'

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
        <Head>
          <Manifest />
        </Head>
        <Layout>
          <Metas />
          <React.StrictMode>
            <Component {...pageProps} />
          </React.StrictMode>
        </Layout>
      </Container>
    )
  }
}

export default MyApp
