import React from 'react'
import { injectGlobal } from 'emotion'
import Head from 'next/head'
import { withTheme } from 'emotion-theming'

const GlobalStyles = ({ theme: { typography, palette: { background } } }) => {
  // eslint-disable-next-line no-unused-expressions
  injectGlobal({
    '*': {
      ...typography,
    },
    'html, body, body > div:first-child, #__next': {
      width: '100%',
      height: '100%',
      margin: 0,
    },
    html: {
      ...typography.body1,
      background: background.default,
      backgroundAttachment: 'fixed',
    },
  })

  return (
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    </Head>
  )
}

export default withTheme(GlobalStyles)
