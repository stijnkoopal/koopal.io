import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'

const Home = ({ theme: { typography } }) => (
  <Flex alignItems="center" justifyContent="center" css={{ height: '100%' }}>
    <Box css={{ ...typography.display2 }}>
      Welcome! My name is Stijn, I'm a Full Stack Software Enthusiast.
    </Box>
  </Flex>
)

export default withTheme(Home)
