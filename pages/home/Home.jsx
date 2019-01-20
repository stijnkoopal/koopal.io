import React from 'react'
import { Flex } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import Typist from 'react-typist';
import MiniMe from './components/MiniMe'

const Container = styled(Flex)({
  height: '100%',
  textAlign: 'center',
  padding: '0.5em',
})

const ConstrainedMiniMe = styled(MiniMe)({
  marginTop: '24px',
  height: '302px',
  display: 'block',
})

const blink = keyframes`
  from, to { opacity: 1 }
  50% { opacity:0; }
`

const TypeWriter = styled(Typist)(({ theme: { typography } }) => ({
  height: '5em',
  ...typography.display1,
  '.Cursor': {
    display: 'inline-block',
    fontSize: `calc(${typography.display1.fontSize} * 1.25)`,
    '&--blinking': {
      opacity: 0,
      animation: `${blink} 1s linear infinite`,
    },
  },
}))

const Home = () => (
  <Container flexDirection="column" alignItems="center" justifyContent="center">
    <TypeWriter>
      Hi! My name is Stijn.

      <br />

      I'm a Full-Stack Software Engineer.
    </TypeWriter>

    <ConstrainedMiniMe />
  </Container>
)

export default Home
