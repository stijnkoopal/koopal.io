import Head from 'next/head'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Menu from 'react-burger-menu/lib/menus/pushRotate'
import Link from 'next/link'
import { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

const titleSeparator = '·'
const siteTitle = `Stijn Koopal ${titleSeparator} Freelance Full-Stack Software Enthusiast`;

injectGlobal`
  html, 
  body, 
  body > div:first-child,
  #__next {
    width: 100%;
    height: 100%;
  }
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
  const {style, ...filteredProps} = props
  return (<Link {...filteredProps}>{filteredProps.children}</Link>)
}

const menuItem = css`
  outline: 0;
  display: block;
`

class WebApp extends React.Component {

  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
    })
  }

  render() {
    const { title, children } = this.props

    return (
      <Fragment>
        <Head>
          <title>{ title } {titleSeparator} { siteTitle }</title>

          <meta name="description" content="" />
          <meta name="keywords" content="" />

          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          <meta name="robots" content="INDEX,FOLLOW" />
        </Head>

        <div id="outer-container" style={{ height: '100%' }}>

          <Menu styles={styles} pageWrapId="page-wrap" outerContainerId="outer-container">
            <LinkWrap prefetch href="/home"><a href className={menuItem}>Home</a></LinkWrap>
            <LinkWrap prefetch href="/about"><a href className={menuItem}>About</a></LinkWrap>
            <LinkWrap prefetch href="/cv"><a href className={menuItem}>CV</a></LinkWrap>
            <LinkWrap prefetch href="/wall"><a href className={menuItem}>Wall</a></LinkWrap>
            <LinkWrap prefetch href="/contact"><a href className={menuItem}>Contact</a></LinkWrap>
          </Menu>

          <main id="page-wrap">
            { children }
          </main>
        </div>
      </Fragment>
    )
  }
}

WebApp.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
}

WebApp.defaultProps = {
  title: 'This is the default title',
}

export default WebApp
