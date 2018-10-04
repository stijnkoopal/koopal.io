import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Box } from '@rebass/grid/emotion'
import Menu from './Menu'

const OuterContainer = styled.div`
  background-color: ${({ theme: { palette: { background } } }) => background.default};
  display: block;
  height: 100%;
`

const Main = props => (
  <Box
    {...props}
    mx="auto"
    width={[1, 1 / 2]}
    css={{
      maxWidth: '1400px',
      height: '100%',
    }}
  />
)

const Layout = ({ children }) => (
  <OuterContainer id="outer-container">
    <Menu pageWrapId="page-wrap" outerContainerId="outer-container" />
    <Main id="page-wrap">
      {children}
    </Main>
  </OuterContainer>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
