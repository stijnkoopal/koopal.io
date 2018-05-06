import App, { Container } from 'next/app'
import React from 'react'
import { injectGlobal } from 'emotion'
import Layout from '../components/Layout'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html, 
  body, 
  body > div:first-child,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

export default class MyApp extends App {
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}
