import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

const Layout = ({ children }) => (
  <outer-container id="outer-container" style={{ display: 'block', height: '100%' }}>
    <Menu pageWrapId="page-wrap" outerContainerId="outer-container" open={false} />
    <main id="page-wrap">
      { children }
    </main>
  </outer-container>
)

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout
