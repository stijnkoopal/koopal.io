import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { withRouter } from 'next/router'
import { Global, css } from '@emotion/core'
import Head from 'next/head'
import Menu from './Menu'
import MenuBurgerIcon from './MenuBurgerIcon'
import Stars from './Stars'

const headerHeight = spacing => 10 * spacing.unit
const iconsSize = '42px';

const Header = styled(Flex)(({ showOnlyMenuIcon, theme: { spacing } }) => ({
  height: headerHeight(spacing),
  justifyContent: 'space-between',
  alignItems: 'center',
  top: 0,
  width: '100%',
  position: showOnlyMenuIcon ? 'relative' : 'sticky',
})).withComponent('header')

const MenuIcon = styled(MenuBurgerIcon)({
  width: iconsSize,
  height: iconsSize,
  zIndex: 1200,
})

const Main = styled(Box)(({ theme: { spacing } }) => ({
  maxWidth: '1400px',
  height: `calc(100% - ${headerHeight(spacing)}px)`,
  position: 'relative',
  zIndex: 1,
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

const globalStyles = ({ typography, palette }) => css({
  '*': {
    ...typography,
  },
  'html, body, body > div:first-of-type, #__next': {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  html: {
    ...typography.body1,
    background: palette.background.default,
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  },
})

class Layout extends React.Component {
  state = {
    menuOpen: false,
  }

  toggleMenuOpened = () => this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }))

  setMenuOpened = ({ isOpen }) => this.setState(() => ({ menuOpen: isOpen }))

  render() {
    const { children, theme } = this.props
    const { menuOpen } = this.state

    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          <Global styles={globalStyles(theme)} />
        </Head>

        <Header showOnlyMenuIcon={menuOpen} px={[3, 4]}>
          <MenuIcon isOpen={menuOpen} onClick={this.toggleMenuOpened} />
          <StijnKoopal />
        </Header>
        <Menu pageWrapId="page-wrap" outerContainerId="__next" isOpen={menuOpen} onStateChange={this.setMenuOpened} />

        <Stars seed={new Date().getMinutes()} numberOfStars={200} speed="fast" starSize="small" />
        <Stars seed={new Date().getMinutes() + 1} numberOfStars={200} speed="medium" starSize="medium" />
        <Stars seed={new Date().getMinutes() + 2} numberOfStars={20} speed="slow" starSize="big" />

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
