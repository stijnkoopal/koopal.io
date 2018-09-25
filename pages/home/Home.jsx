import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import styled from 'react-emotion'

const Container = styled(Flex)`
  height: 100%;
`

const Inner = styled(Box)(({ theme: { typography } }) => ({
  ...typography.display2,
  textAlign: 'center',
}));

const Home = () => (
  <Container alignItems="center" justifyContent="center">
    <Inner>
      Welcome!<br />
      My name is Stijn, I'm a Full Stack Software Enthusiast.
    </Inner>
  </Container>
)

export default withTheme(Home)
