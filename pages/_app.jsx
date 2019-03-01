import App, { Container } from 'next/app'
import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import MetaTags from './_components/MetaTags'
import Layout from './_components/Layout'
import curiousLittleMouse from './_services/curiousLittleMouse'
import logSource from './_services/logSource'
import theme from './theme'

const environment = process.env.NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx)
      return { pageProps }
    }

    return {}
  }

  componentDidMount = () => {
    if (this.props.isProduction) {
      curiousLittleMouse()
      logSource()
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Layout>
            <MetaTags />
            {/* <React.StrictMode> */}
            <Component {...pageProps} />
            {/* </React.StrictMode> */}
          </Layout>
        </ThemeProvider>
      </Container>
    )
  }
}

MyApp.defaultProps = {
  environment,
  isProduction,
}

export default MyApp
