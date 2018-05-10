import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'

// Set the styles ourselves though
const menuItem = css`
  outline: 0;
  display: block;
  color: white;
`

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#bdc3c7',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
}

// react-burger-menu sets `style` on its direct children. That gives a prop-types validation error
const LinkWrap = (props) => {
  // eslint-disable-next-line react/prop-types
  const { style, ...filteredProps } = props
  return (<Link {...filteredProps}>{filteredProps.children}</Link>)
}

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/wall', label: 'Wall' },
  { href: '/contact', label: 'Contact' },
]

const Menu = ({ pageWrapId, outerContainerId, isOpen }) => (
  <RotateMenu width="100%" right styles={styles} pageWrapId={pageWrapId} outerContainerId={outerContainerId} isOpen={isOpen}>
    {
      menuItems.map(({ href, label }) =>
        <LinkWrap key={href} prefetch href={href}><a className={menuItem}>{label}</a></LinkWrap>)
    }
  </RotateMenu>
)

Menu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
}

Menu.defaultProps = {
  isOpen: false,
}

export default Menu
