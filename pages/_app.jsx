import { ThemeProvider } from 'emotion-theming'
import App from 'next/app'
import React from 'react'
import theme from './theme'
import MetaTags from './_components/MetaTags'
import curiousLittleMouse from './_services/curiousLittleMouse'
import logSource from './_services/logSource'

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
      <ThemeProvider theme={theme}>
        <MetaTags />
        {/* <React.StrictMode> */}
        <Component {...pageProps} />
        {/* </React.StrictMode> */}
      </ThemeProvider>
    )
  }
}

MyApp.defaultProps = {
  environment,
  isProduction,
}

export default MyApp
