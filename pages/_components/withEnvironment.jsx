import React from 'react'

const environment = process.env.NODE_ENV
const isProduction = process.env.NODE_ENV === 'production'

const withEnvironment = WrappedComponent => class extends React.Component {
  static getInitialProps(ctx) {
    if (WrappedComponent.getInitialProps) return WrappedComponent.getInitialProps(ctx);
    return undefined
  }

  render = () => <WrappedComponent {...this.props} environment={environment} isProduction={isProduction} />
}

export default withEnvironment
