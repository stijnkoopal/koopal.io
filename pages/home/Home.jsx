import React from 'react'
import { Flex, Box } from '@rebass/grid/emotion'
import { withTheme } from 'emotion-theming'
import styled, { keyframes } from 'react-emotion'
import MiniMe from './components/MiniMe'

const Container = styled(Flex)`
  height: 100%;
`

const Inner = styled(Box)({
  textAlign: 'center',
});

const typing = keyframes`
    from { width: 0 }
    to { width: 100% }
`

const blinkingCaret = keyframes`
    from, to { border-color: transparent }
    50% { border-color: orange }
`

const TypeWriterLine = styled.p(({ animationDuration, animationDelay, theme: { typography } }) => ({
  overflow: 'hidden',
  ...typography.display2,
  width: 0,
  animation: `${typing} ${animationDuration} steps(30, end), ${blinkingCaret} 0.5s step-end ${Math.round(parseFloat(animationDuration) / 0.5)}`,
  animationDelay,
  borderRight: '.15em solid transparent', /* The typwriter cursor */
  whiteSpace: 'nowrap',
  margin: '0 auto', /* Gives that scrolling effect as the typing happens */
  animationFillMode: 'forwards',
}))

const TypeWriter = ({ children }) => {
  const text = Child => Child.props.children
  const animationDuration = Child => (text(Child).length ** 0.5) * 0.4

  const delays = children.reduce((acc, child, index) => [
    ...acc,
    index === 0 ? 0.3 : acc[index - 1] + animationDuration(children[index - 1])],
  [])

  return (
    <>
      {
        React.Children.map(children, (Child, index) => React.cloneElement(Child, {
          animationDuration: `${animationDuration(Child)}s`,
          animationDelay: `${delays[index]}s`,
        }))
      }
    </>
  )
}

const ConstrainedMiniMe = styled(MiniMe)({
  marginTop: '24px',
  maxHeight: '302px',
})

const Home = () => (
  <Container alignItems="center" justifyContent="center">
    <Inner>
      <TypeWriter>
        <TypeWriterLine>
          Welcome!
        </TypeWriterLine>
        <TypeWriterLine>
          My name is Stijn, I'm a Full Stack Software Enthusiast.
        </TypeWriterLine>
      </TypeWriter>

      <ConstrainedMiniMe />
    </Inner>
  </Container>
)

export default withTheme(Home)
