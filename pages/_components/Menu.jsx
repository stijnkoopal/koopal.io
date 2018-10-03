import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'

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

const MenuItemText = styled('span')`
  text-align: center;
  display: block;
  width: 100%;
`

const transitionDuration = '.4s';
const burgerMenuStyles = ({ palette: { primary: { main }, grey } }) => ({
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
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
  bmOverlay: {
    transitionDuration: `${transitionDuration} !important`,
  },
  bmMenuWrap: {
    transitionDuration: `${transitionDuration} !important`,
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

const Path = styled.path(({ theme: { palette } }) => `
  fill: none; 
  transition: stroke-dashoffset 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25), stroke-dasharray 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25); 
  stroke-width: 40px; 
  stroke-linecap: round; 
  stroke: ${palette.primary.main}; 
`)

const OuterPath = styled(Path)(({ isOpen }) => `
  stroke-dasharray: 240px 950px; 
  stroke-dashoffset: ${isOpen ? -650 : 0}px;
`)

const MiddlePath = styled(Path)(({ isOpen }) => `
  stroke-dasharray: ${isOpen ? '1px 220px' : '240px 240px'}; 
  stroke-dashoffset: ${isOpen ? -115 : 0}px;
`)

const ContainerButton = styled.button`
  border: 0;
  background: none;
  outline: none;
  padding: 0;
  width: 100px;
`

const BurgerMenuButton = ({ isOpen, onClick }) => (
  <ContainerButton type="button" onClick={onClick} tabIndex="0">
    <svg viewBox="0 0 800 600" transform="translate3d(0, 0, 0);">
      <OuterPath isOpen={isOpen} d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" />
      <MiddlePath isOpen={isOpen} d="M300,320 L540,320" />
      <OuterPath
        isOpen={isOpen}
        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
        transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
      />
    </svg>
  </ContainerButton>
)

class Menu extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      menuOpen: false,
    }
  }

  handleMenuStateChange({ isOpen }) {
    this.setState({ menuOpen: isOpen });
  }

  toggleMenu() {
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
        styles={burgerMenuStyles(theme)}
        pageWrapId={pageWrapId}
        outerContainerId={outerContainerId}
        isOpen={menuOpen}
        onStateChange={state => this.handleMenuStateChange(state)}
        customBurgerIcon={<BurgerMenuButton isOpen={menuOpen} onClick={() => this.toggleMenu()} />}
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
