import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { withRouter } from 'next/router'
import Menu from './Menu'
import MenuBurgerIcon from './MenuBurgerIcon'

const OuterContainer = styled.div`
  display: block;
  height: 100vh;
`

const headerHeight = spacing => 10 * spacing.unit;

const Header = styled(Flex)(({ showOnlyMenuIcon, theme: { spacing } }) => ({
  height: headerHeight(spacing),
  justifyContent: 'space-between',
  alignItems: 'center',
  top: 0,
  width: '100%',
  position: showOnlyMenuIcon ? 'relative' : 'sticky',
  zIndex: showOnlyMenuIcon ? 'unset' : 1200,
})).withComponent('header')

const MenuIcon = styled(MenuBurgerIcon)({
  width: '48px',
  height: '48px',
  zIndex: 1200,
})

const Main = styled(Box)(({ theme: { spacing } }) => ({
  maxWidth: '1400px',
  height: `calc(100% - ${headerHeight(spacing)}px)`,
})).withComponent('main')

class Layout extends React.Component {
  state = {
    menuOpen: false,
  }

  toggleMenuOpened = () => this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }))

  setMenuOpened = ({ isOpen }) => this.setState(() => ({ menuOpen: isOpen }))

  render() {
    const { children } = this.props
    const { menuOpen } = this.state

    return (
      <OuterContainer id="outer-container">
        <Header showOnlyMenuIcon={menuOpen} px={[3, 7]}>
          <MenuIcon isOpen={menuOpen} onClick={this.toggleMenuOpened} />
        </Header>
        <Menu pageWrapId="page-wrap" outerContainerId="outer-container" isOpen={menuOpen} onStateChange={this.setMenuOpened} />
        <Main
          mx="auto"
          width={[1, 1 / 2]}
          p="3"
          id="page-wrap"
        >
          {children}
        </Main>
      </OuterContainer>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRouter(withTheme(Layout))
