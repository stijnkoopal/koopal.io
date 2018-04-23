import React from 'react'
import WebApp from '../components/web-app'
import styled, { css } from 'react-emotion'

const Container = styled('container')`
  background: #EEE;
`

const myStyle = css`
  color: rebeccapurple;
  font-weight: bold;
`

export default () => (
  <WebApp>
    <Container>Welcome to <p className={myStyle}>next.js!</p></Container>
  </WebApp>
);
