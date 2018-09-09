import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'

// Set the styles ourselves though
const MenuItem = styled('a')`
  outline: 0;
  display: block;
  color: white;
  cursor: pointer;
`

const styles = ({ palette: { primary: { main }, grey } }) => ({
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: main,
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: main,
  },
  bmMenu: {
    background: grey[800],
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
})

// react-burger-menu sets `style` on its direct children. That gives a prop-types validation error
const LinkWrap = (props) => {
  // eslint-disable-next-line react/prop-types
  const { style, className, ...filteredProps } = props
  return (
    <Link {...filteredProps}>
      {filteredProps.children}
    </Link>
  )
}

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/wall', label: 'Wall' },
  { href: '/contact', label: 'Contact' },
]

const Menu = ({
  pageWrapId, outerContainerId, isOpen, theme,
}) => (
  <RotateMenu width="100%" right styles={styles(theme)} pageWrapId={pageWrapId} outerContainerId={outerContainerId} isOpen={isOpen}>
    {
      menuItems.map(({ href, label }) => (
        <LinkWrap key={href} prefetch href={href}>
          <MenuItem>
            {label}
          </MenuItem>
        </LinkWrap>
      ))
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

export default withTheme(Menu)
