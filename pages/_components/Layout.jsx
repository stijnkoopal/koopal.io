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
  height: 100%;
`

const Header = styled(Flex)(({ openedMenu, theme: { spacing, shadows } }) => ({
  height: 10 * spacing.unit,
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: shadows[24],
  top: 0,
  width: '100%',
  position: openedMenu ? 'relative' : 'sticky',
  zIndex: openedMenu ? 'unset' : 1200,
  background: 'black',
}))

const CurrentPage = styled.div(({ theme: { typography }}) => ({
  ...typography.display1,
}))

const MenuIcon = styled(MenuBurgerIcon)({
  width: '48px',
  height: '48px',
  zIndex: 1200,
})

class Layout extends React.Component {
  state = {
    menuOpen: false,
  }

  toggleMenu = () => this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }))

  setMenuState = ({ isOpen }) => this.setState(() => ({ menuOpen: isOpen }))

  render() {
    const { router, children } = this.props
    const { menuOpen } = this.state

    return (
      <OuterContainer id="outer-container">
        <Header openedMenu={menuOpen} px={[3, 7]}>
          <MenuIcon isOpen={menuOpen} onClick={this.toggleMenu} />
          <CurrentPage>
            {router.asPath}
          </CurrentPage>
        </Header>
        <Menu pageWrapId="page-wrap" outerContainerId="outer-container" isOpen={menuOpen} onStateChange={this.setMenuState} />
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
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRouter(withTheme(Layout))
