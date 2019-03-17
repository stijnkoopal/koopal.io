import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import pureCss from 'purecss/build/base-min.css'
import ServiceWorker from 'next-workbox/service-worker'

const GA_TRACKING_ID = 'UA-135619895-1'

export default class extends Document {
  renderGoogleAnalytics = () =>
    process.env.NODE_ENV !== 'production' ? null : (
      <React.Fragment>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
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
    return (
      <html lang="en">
        <Head>
          {this.renderGoogleAnalytics()}

          <style dangerouslySetInnerHTML={{ __html: pureCss }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <ServiceWorker src="/static/workbox/sw.js" scope="/" unregister={process.env.NODE_ENV !== 'production'} />
        </body>
      </html>
    )
  }
}
