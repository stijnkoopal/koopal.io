import React from 'react'
import { Global, css } from '@emotion/core'
import Head from 'next/head'
import { withTheme } from 'emotion-theming'

const GlobalStyles = ({ theme: { typography, palette: { background } } }) => (
  <Head>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    <Global styles={css({
      '*': {
        ...typography,
      },
      'html, body, body > div:first-of-type, #__next': {
        width: '100%',
        height: '100%',
        margin: 0,
      },
      html: {
        ...typography.body1,
        background: background.default,
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      },
    })}
    />
  </Head>
)

export default withTheme(GlobalStyles)
