import React from 'react'
import styled, { css } from 'react-emotion'
import WebApp from '../components/web-app'

const Container = styled('container')`
  background: #EEE;
`

const myStyle = css`
  color: rebeccapurple;
  font-weight: bold;
`

class HomePage extends React.Component {
  componentDidMount() {
    fetch('/.netlify/functions/fetchMediuMposts')
      .then(console.log)
      .catch(console.error)
  }

  render() {
    return (
      <WebApp>
        <Container>Welcome to <p className={myStyle}>next.js!</p></Container>
      </WebApp>
    )
  }
}

export default HomePage;
