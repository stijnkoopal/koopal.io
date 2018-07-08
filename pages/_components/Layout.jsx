import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import Menu from './Menu'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html, 
  body, 
  body > div:first-child,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

const Layout = ({ children }) => (
  <outer-container id="outer-container" style={{ display: 'block', height: '100%' }}>
    <Menu pageWrapId="page-wrap" outerContainerId="outer-container" />
    <main id="page-wrap">
      { children }
    </main>
  </outer-container>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
