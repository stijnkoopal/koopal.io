import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'
import Router from 'next/router'

const MenuItem = styled.a({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '90%',
  height: 'calc(100% / 5)',
  maxWidth: '600px',
  margin: '0 auto',
  color: 'white',
  cursor: 'pointer',
})

const MenuItemText = styled.span(({ theme: { typography, palette } }) => ({
  textAlign: 'center',
  display: 'block',
  width: '100%',
  ...typography.headline,
  color: palette.primary.contrastText,
}))

const menuStyles = ({ palette: { background } }) => ({
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
    background: background.alternative,
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
})

// react-burger-menu sets `style` on its direct children. That gives a prop-types validation error
const LinkWrap = (props) => {
  // eslint-disable-next-line react/prop-types
  const unknownProperties = ['style', 'class', 'className', '__source']
  const filteredProps = Object.keys(props)
    .filter(key => !unknownProperties.includes(key))
    .reduce((acc, val) => ({ ...acc, [val]: props[val] }), {})

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

class Menu extends React.Component {
  componentDidMount = () => Router.router.events.on('routeChangeStart', this.closeMenu)

  componentWillUnmount = () => Router.router.events.off('routeChangeStart', this.closeMenu)

  closeMenu = () => this.props.onStateChange({ isOpen: false })

  render() {
    const {
      pageWrapId, outerContainerId, theme, isOpen, onStateChange,
    } = this.props

    return (
      <RotateMenu
        width="100%"
        right
        styles={menuStyles(theme)}
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
        isOpen={isOpen}
        onStateChange={onStateChange}
        customBurgerIcon={undefined}
        customCrossIcon={false}
      >
        {
          menuItems.map(({href, label}) => (
            <LinkWrap key={href} prefetch href={href}>
              <MenuItem>
                <MenuItemText>
                  {label}
                </MenuItemText>
              </MenuItem>
            </LinkWrap>
          ))
        }
      </RotateMenu>
    )
  }
}

Menu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  onStateChange: PropTypes.func,
}

Menu.defaultProps = {
  isOpen: false,
  onStateChange: () => undefined,
}

export default withTheme(Menu)
