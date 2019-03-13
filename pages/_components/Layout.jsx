import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import { withRouter } from 'next/router'
import { Global } from '@emotion/core'
import Head from 'next/head'
import Menu from './Menu'
import MenuBurgerIcon from './MenuBurgerIcon'
import Stars from './Stars'
import { themeShape } from '../wall/prop-types'
import useResume from './useResume'

// `vh` unit on mobile devices include the url bar. This is unwanted behaviour, fix it with:
// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
if (typeof window !== 'undefined') {
  const setVh = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  window.addEventListener('resize', setVh)
  setVh()
}

const headerHeight = spacing => 10 * spacing.unit
const iconsSize = '42px'

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
  flexShrink: 0,
})

KoopalMeLogo.defaultProps = {
  src: '/static/koopal.io.svg',
  alt: 'K',
  title: 'Go to home page',
}

const LogoText = styled(Box)(({ theme: { palette, typography } }) => ({
  ...typography.headline,
  color: palette.secondary,
  overflow: 'hidden',
}))

const HomeAnchor = styled(Flex)(({ theme: { palette, spacing } }) => ({
  justifyContent: 'flex-end',
  alignItems: 'center',
  textDecoration: 'none',
  color: palette.text.primary,
  width: 18 * spacing.unit,
})).withComponent('a')

const Logo = () => (
  <HomeAnchor href="/">
    <LogoText width={[0, 1]}>Stijn</LogoText>
    <KoopalMeLogo />
    <LogoText width={[0, 1]}>oopal</LogoText>
  </HomeAnchor>
)

const globalStyles = ({ typography }) => ({
  '*': {
    ...typography,
  },
  'body, body > div:first-of-type, #__next': {
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100)',
    margin: 0,
  },
  html: {
    ...typography.body1,
    minHeight: '337px',
  },
})

// By: https://www.fourkitchens.com/blog/article/fix-scrolling-performance-css-will-change-property/
const FixedBackground = styled(Box)(({ theme: { palette } }) => ({
  zIndex: -1,
  position: 'relative',
  '&::before': {
    content: '" "',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    background: palette.background.default,
    backgroundSize: 'cover',
    willChange: 'transform',
    zIndex: -1,
  },
}))

const SocialButton = styled(Box)({
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  '&:hover': {
    opacity: 0.7,
  },
  '&:last-child': {
    marginBottom: 0,
  },
}).withComponent('a')

const socialButtonsStyle = theme => ({
  flexDirection: 'column',
  position: 'fixed',
  left: '0',
  top: '50%',
  transform: 'translate(0, -50%)',
  maxWidth: '40px',
  minWidth: '24px',
  width: '8vw',
  background: theme.palette.colors.secondary,
  opacity: 0.8,
  borderTopRightRadius: '8px',
  borderBottomRightRadius: '8px',
  zIndex: 1100,
})

const SocialButtons = () => {
  const resume = useResume()
  return (
    <Flex p="1" css={socialButtonsStyle}>
      {resume.basics.profiles.map(profile => (
        <SocialButton my="1" key={profile.key} href={profile.url} target="_blank" rel="noopener noreferrer">
          <img src={profile.icon} alt={profile.network} title={`Open my ${profile.network} profile`} />
        </SocialButton>
      ))}
    </Flex>
  )
}

const Layout = ({ children, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <Global styles={globalStyles(theme)} />
      </Head>

      <FixedBackground />
      <Header showOnlyMenuIcon={menuOpen} px={[3, 4]}>
        <MenuIcon isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        <Logo />
      </Header>
      <Menu
        pageWrapId="page-wrap"
        outerContainerId="__next"
        isOpen={menuOpen}
        onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      />

      <Stars seed={new Date().getMinutes()} numberOfStars={200} speed="fast" starSize="small" />
      <Stars seed={new Date().getMinutes() + 1} numberOfStars={200} speed="medium" starSize="medium" />
      <Stars seed={new Date().getMinutes() + 2} numberOfStars={20} speed="slow" starSize="large" />

      <SocialButtons />

      <Main mx="auto" width={[1, 0.75, 0.5]} p={[2, 3]} id="page-wrap">
        {children}
      </Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  theme: themeShape.isRequired,
}

export default withRouter(withTheme(Layout))
