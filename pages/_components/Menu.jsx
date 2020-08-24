import styled from '@emotion/styled'
import { Flex } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import { themeShape } from '../../lib/prop-types'

const MenuItem = styled(Flex)({
  alignItems: 'center',
  textAlign: 'center',
  width: '90%',
  height: 'calc(100% / 5)',
  maxWidth: '600px',
  margin: '0 auto',
  color: 'white',
  cursor: 'pointer',
}).withComponent('a')

const MenuItemText = styled(Flex)(({ theme: { typography } }) => ({
  textAlign: 'center',
  display: 'block',
  width: '100%',
  ...typography.headline,
}))

const menuStyles = ({
  bmBurgerButton: {
    position: 'relative',
    width: '64px',
    height: '64px',
    zIndex: 1200,
  },
  bmBurgerIcon: {
    display: 'none',
  },
  bmMenu: {
    fontSize: '2em',
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '8% 0',
    boxSizing: 'border-box',
  },
  bmMenuWrap: {
    top: 0,
  },
  bmOverlay: {
    top: 0,
  },
})

// react-burger-menu sets `style` on its direct children. That gives a prop-types validation error
const LinkWrap = props => {
  // eslint-disable-next-line react/prop-types
  const unknownProperties = ['style', 'class', 'className', '__source', 'tabIndex']
  const filteredProps = Object.keys(props)
    .filter(key => !unknownProperties.includes(key))
    .reduce((acc, val) => ({ ...acc, [val]: props[val] }), {})

  return <Link {...filteredProps}>{filteredProps.children}</Link>
}

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'This is me' },
  { href: '/resume', label: 'Resume' },
  { href: '/wall', label: 'Wall' },
  { href: '/contact', label: 'Contact' },
]

const Menu = ({ pageWrapId, theme, isOpen, onStateChange }) => {
  useEffect(() => {
    const closeMenu = () => onStateChange({ isOpen: false })

    Router.router.events.on('routeChangeStart', closeMenu)
    return () => Router.router.events.off('routeChangeStart', closeMenu)
  })

  return (
    <RotateMenu
      width="100%"
      right
      styles={menuStyles}
      pageWrapId={pageWrapId}
      isOpen={isOpen}
      onStateChange={onStateChange}
      customBurgerIcon={undefined}
      customCrossIcon={false}
    >
      {menuItems.map(({ href, label }) => (
        <LinkWrap key={href} href={href}>
          <MenuItem>
            <MenuItemText>{label}</MenuItemText>
          </MenuItem>
        </LinkWrap>
      ))}
    </RotateMenu>
  )
}

Menu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onStateChange: PropTypes.func,
  theme: themeShape.isRequired,
}

Menu.defaultProps = {
  isOpen: false,
  onStateChange: () => undefined,
}

export default withTheme(Menu)
