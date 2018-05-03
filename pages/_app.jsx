import App, { Container } from 'next/app'
import React from 'react'
import { injectGlobal } from 'emotion'
import Layout from '../components/Layout'

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
