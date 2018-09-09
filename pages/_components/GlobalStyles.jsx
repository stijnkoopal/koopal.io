import React from 'react'
import { injectGlobal } from 'emotion'
import Head from 'next/head'

const GlobalStyles = ({ theme: { typography } }) => {
  injectGlobal`
    * {
      font-family: ${typography.fontFamily};
      font-size: ${typography.fontSize};
      font-weight: ${typography.fontWeightRegular};
    }
    
    html, 
    body, 
    body > div:first-child,
    #__next {
      width: 100%;
      height: 100%;
      margin: 0;
    }
    
    body {
      font-family: ${typography.body1.fontFamily};
      font-size: ${typography.body1.fontSize};
      line-height: ${typography.body1.lineHeight};
      color: ${typography.body1.color};
      font-weight: ${typography.body1.fontWeight};
    }
  `

  return (
    <Head>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    </Head>
  )
}

export default GlobalStyles
