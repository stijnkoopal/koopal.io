import Head from 'next/head'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const WebApp = ({ children, title }) => (
  <Fragment>
    <Head>
      <title>{ title }</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    { children }
  </Fragment>
)

WebApp.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
}

WebApp.defaultProps = {
  title: 'This is the default title',
}

export default WebApp;
