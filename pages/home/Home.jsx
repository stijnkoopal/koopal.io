import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import styled, { keyframes } from 'react-emotion'
import Typist from 'react-typist';
import MiniMe from './components/MiniMe'

const Container = styled(Flex)`
  height: 100%;
`

const Inner = styled(Box)({
  textAlign: 'center',
});

const ConstrainedMiniMe = styled(MiniMe)({
  marginTop: '24px',
  height: '302px',
})

const blink = keyframes`
  from, to { opacity: 1 }
  50% { opacity:0; }
`

const TypeWriter = styled(Typist)(({ theme: { typography } }) => ({
  ...typography.display2,
  '.Cursor': {
    display: 'inline-block',
    fontSize: `calc(${typography.display2.fontSize} * 1.25)`,
    '&--blinking': {
      opacity: 0,
      animation: `${blink} 1s linear infinite`,
    },
  },
}))

const Home = () => (
  <Container alignItems="center" justifyContent="center">
    <Inner>
      <TypeWriter>
        Hi!
        <br />
        My name is Stijn,

        <br />

        I'm a Full Stack Software Enthusiast.
      </TypeWriter>

      <ConstrainedMiniMe />
    </Inner>
  </Container>
)

export default withTheme(Home)
