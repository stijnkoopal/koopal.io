import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import Menu from './Menu'

const OuterContainer = styled.div`
  display: block;
  height: 100%;
`

const Header = styled.div(({ theme: { spacing } }) => ({
  height: 10 * spacing.unit,
}))

const Layout = ({ children }) => (
  <OuterContainer id="outer-container">
    <Header>
      <Menu pageWrapId="page-wrap" outerContainerId="outer-container" />
    </Header>
    <Box
      mx="auto"
      width={[1, 1 / 2]}
      p="3"
      css={{
        maxWidth: '1400px',
        height: '100%',
      }}
      id="page-wrap"
    >
      {children}
    </Box>
  </OuterContainer>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withTheme(Layout)
