import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

const GA_TRACKING_ID = process.env.NODE_ENV === 'production' ? 'UA-119842493-1' : null;

class MyDocument extends Document {
  render() {
    const scripts = !GA_TRACKING_ID || GA_TRACKING_ID.length === 0
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

    return (
      <html lang="en">
        <Head>
          {scripts}
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
