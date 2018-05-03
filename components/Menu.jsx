import React from 'react'
import RotateMenu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import { css } from 'react-emotion'
import PropTypes from 'prop-types'

const menuItem = css`
  outline: 0;
  display: block;
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

const LinkWrap = (props) => {
  const { style, ...filteredProps } = props
  return (<Link {...filteredProps}>{filteredProps.children}</Link>)
}

const Menu = ({ pageWrapId, outerContainerId, open }) => (
  <RotateMenu styles={styles} pageWrapId={pageWrapId} outerContainerId={outerContainerId} open={open}>
    <LinkWrap prefetch href="/home"><a className={menuItem}>Home</a></LinkWrap>
    <LinkWrap prefetch href="/about"><a className={menuItem}>About</a></LinkWrap>
    <LinkWrap prefetch href="/resume"><a className={menuItem}>Resume</a></LinkWrap>
    <LinkWrap prefetch href="/wall"><a className={menuItem}>Wall</a></LinkWrap>
    <LinkWrap prefetch href="/contact"><a className={menuItem}>Contact</a></LinkWrap>
  </RotateMenu>
)

Menu.propTypes = {
  pageWrapId: PropTypes.string.isRequired,
  outerContainerId: PropTypes.string.isRequired,
  open: PropTypes.bool,
}

Menu.defaultProps = {
  open: false,
}

export default Menu
