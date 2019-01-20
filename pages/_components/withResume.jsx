import React from 'react'
import resume from '../../static/resume'

const withResume = WrappedComponent =>
  class extends React.Component {
    static getInitialProps(ctx) {
      if (WrappedComponent.getInitialProps) return WrappedComponent.getInitialProps(ctx)
      return undefined
    }

    render = () => <WrappedComponent {...this.props} resume={resume} />
  }

export default withResume
