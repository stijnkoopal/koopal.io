import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'
import Router from 'next/router'
import MenuBurgerIcon from './MenuBurgerIcon'

const MenuItem = styled('a')`
  display: flex;
  align-items: center;
  text-align: center;
  width: 90%;
  height: calc(100% / 5);
  max-width: 600px;
  margin: 0 auto;
  color: white;
  cursor: pointer;
`

const MenuItemText = styled('span')(({ theme: { typography, palette } }) => ({
  textAlign: 'center',
  display: 'block',
  width: '100%',
  ...typography.headline,
  color: palette.primary.contrastText,
}))

const menuStyles = ({ transitions, palette: { primary: { main }, grey } }) => ({
  bmBurgerButton: {
    position: 'fixed',
    width: '100px',
    height: '100px',
    left: '32px',
    top: '32px',
    zIndex: 1200,
  },
  bmBurgerBars: {
    background: main,
  },
  bmCrossButton: {
    height: '64px',
    width: '64px',
    left: '14px',
  },
  bmCross: {
    background: main,
    height: '64px',
  },
  bmMenu: {
    background: grey[800],
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
    transitionDuration: `${transitions.duration.enteringScreen}ms !important`,
  },
  bmOverlay: {
    transitionDuration: `${transitions.duration.enteringScreen}ms !important`,
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

class Menu extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    }
  }

  componentDidMount() {
    Router.router.events.on('routeChangeStart', this.closeMenu)
  }

  componentWillUnmount() {
    Router.router.events.off('routeChangeStart', this.closeMenu)
  }

  handleMenuStateChange = ({ isOpen }) => this.setState({ menuOpen: isOpen })

  closeMenu = () => this.setState({ menuOpen: false })

  toggleMenu = () => {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen })
  }

  render() {
    const {
      pageWrapId, outerContainerId, theme,
    } = this.props;
    const { menuOpen } = this.state;

    return (
      <RotateMenu
        width="100%"
        right
        styles={menuStyles(theme)}
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
        isOpen={menuOpen}
        onStateChange={this.handleMenuStateChange}
        customBurgerIcon={<MenuBurgerIcon isOpen={menuOpen} onClick={this.toggleMenu} />}
        customCrossIcon={false}
      >
        {
            menuItems.map(({ href, label }) => (
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
}

Menu.defaultProps = {
}

export default withTheme(Menu)
