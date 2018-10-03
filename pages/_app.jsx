import App, { Container } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from 'emotion-theming'
import Manifest from 'next-manifest/manifest'
import MetaTags from './_components/MetaTags';
import Layout from './_components/Layout'
import curiousLittleMouse from './_services/curiousLittleMouse';
import logSource from './_services/logSource'
import theme from './theme';
import GlobalStyles from './_components/GlobalStyles'
import withEnvironment from './_components/withEnvironment'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      return { pageProps }
    }

    return {}
  }

  componentDidMount() {
    if (this.props.isProduction) {
      curiousLittleMouse()
      logSource()
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <Manifest />
        </Head>
        <ThemeProvider theme={theme}>
          <Layout>
            <GlobalStyles />
            <MetaTags />
            {/*<React.StrictMode>*/}
              <Component {...pageProps} />
            {/*</React.StrictMode>*/}
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withEnvironment(MyApp)
