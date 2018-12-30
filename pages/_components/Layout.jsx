import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { withRouter } from 'next/router'
import Menu from './Menu'
import MenuBurgerIcon from './MenuBurgerIcon'
import Stars from './Stars'

const headerHeight = spacing => 10 * spacing.unit
const menuZIndex = 1200
const iconsSize = '42px';

const Header = styled(Flex)(({ showOnlyMenuIcon, theme: { spacing } }) => ({
  height: headerHeight(spacing),
  justifyContent: 'space-between',
  alignItems: 'center',
  top: 0,
  width: '100%',
  position: showOnlyMenuIcon ? 'relative' : 'sticky',
  zIndex: showOnlyMenuIcon ? 'unset' : menuZIndex,
})).withComponent('header')

const MenuIcon = styled(MenuBurgerIcon)({
  width: iconsSize,
  height: iconsSize,
  zIndex: menuZIndex,
})

const Main = styled(Box)(({ theme: { spacing } }) => ({
  maxWidth: '1400px',
  height: `calc(100% - ${headerHeight(spacing)}px)`,
})).withComponent('main')

const KoopalMeLogo = styled.img({
  width: iconsSize,
  height: iconsSize,
})

KoopalMeLogo.defaultProps = {
  src: '/static/koopal.me.svg',
}

const LogoText = styled(Box)(({ theme: { palette, typography } }) => ({
  ...typography.headline,
  color: palette.secondary,
  overflow: 'hidden',
}))

const StijnKoopalAnchor = styled(Flex)(({ theme: { palette, spacing } }) => ({
  // zIndex: menuZIndex,
  justifyContent: 'flex-end',
  alignItems: 'center',
  textDecoration: 'none',
  color: palette.text.primary,
  width: 18 * spacing.unit,
})).withComponent('a')

const StijnKoopal = () => (
  <StijnKoopalAnchor href="/">
    <LogoText width={[0, 1]}>Stijn</LogoText>
    <KoopalMeLogo />
    <LogoText width={[0, 1]}>oopal</LogoText>
  </StijnKoopalAnchor>
)

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
      <>
        <Header showOnlyMenuIcon={menuOpen} px={[3, 4]}>
          <MenuIcon isOpen={menuOpen} onClick={this.toggleMenuOpened} />
          <StijnKoopal />
        </Header>
        <Menu pageWrapId="page-wrap" outerContainerId="__next" isOpen={menuOpen} onStateChange={this.setMenuOpened} />

        <Stars numberOfStars={200} speed="fast" starSize="small" />
        <Stars numberOfStars={200} speed="medium" starSize="medium" />
        <Stars numberOfStars={20} speed="slow" starSize="big" />

        <Main
          mx="auto"
          width={[1, 1 / 2]}
          p="3"
          id="page-wrap"
        >
          {children}
        </Main>
      </>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default withRouter(withTheme(Layout))
