import React from 'react'
import Head from 'next/head'
import {withTheme} from 'emotion-theming'
import withResume from './withResume'

const MetaTags = ({ resume, theme: { palette } }) => (
  <>
    <Head>
      <title>{`${resume.basics.name} | ${resume.basics.label}`}</title>

      <meta name="description" content="" />
      <meta name="keywords" content="" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      <meta name="robots" content="INDEX,FOLLOW" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="" />
      <meta property="og:type" content="" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />

      <link rel="canonical" href="https://koopal.me" />
      <meta property="author" content="Stijn Koopal" />

      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
      <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color={palette.colors.primary} />
      <meta name="apple-mobile-web-app-title" content="Stijn Koopal" />
      <meta name="application-name" content="Stijn Koopal" />
      <meta name="msapplication-TileColor" content={palette.colors.primary} />
      <meta name="theme-color" content={palette.colors.primary} />
    </Head>
  </>
)

export default withResume(withTheme(MetaTags))
