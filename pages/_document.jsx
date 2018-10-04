import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractCritical } from 'emotion-server'
import pureCss from 'purecss/build/base-min.css'

const GA_TRACKING_ID = 'UA-119842493-1'

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    const styles = extractCritical(page.html)

    return { ...page, ...styles }
  }

  renderGoogleAnalytics = (isProduction) => !isProduction
    ? null
    : (
      <React.Fragment>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `,
          }}
        />
      </React.Fragment>
    )

  render() {
    const { isProduction } = this.props
    return (
      <html lang="en">
        <Head>
          {this.renderGoogleAnalytics(isProduction)}

          <style dangerouslySetInnerHTML={{ __html: pureCss }} />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument
