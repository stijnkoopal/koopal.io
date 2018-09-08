import React from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'emotion'
import styled from 'react-emotion'
import Menu from './Menu'

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    font-family: 'Roboto', sans-serif;
  }
  
  html, 
  body, 
  body > div:first-child,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

const OuterContainer = styled('div')`
  background-color: ${({ theme: { palette: { background } } }) => background.default};
  display: block;
  height: 100%;
`

const Main = styled('div')``

const Layout = ({ children }) => (
  <OuterContainer id="outer-container">
    <Menu pageWrapId="page-wrap" outerContainerId="outer-container" />
    <Main id="page-wrap">
      { children }
    </Main>
  </OuterContainer>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
