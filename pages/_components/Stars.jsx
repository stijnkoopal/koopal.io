import { keyframes } from 'emotion'
import styled from 'react-emotion'
import { Box } from '@rebass/grid/dist/emotion'

const starsKeyframe = keyframes`
  from { transform: translateY(0px) }
  to { transform: translateY(-2000px) }
`

const starsBoxShadow = (n, starColor = '#FFF') => new Array(n)
  .fill(0)
  .map(_ => `${Math.ceil(Math.random() * 2000)}px ${Math.ceil(Math.random() * 2000)}px ${starColor}`)
  .join(', ')

const starAnimationSpeeds = {
  no: 999999,
  slow: 200,
  medium: 100,
  fast: 50,
}

const starPixelSizes = {
  small: 1,
  medium: 2,
  big: 3,
}

export default styled(Box)(({ numberOfStars = 20, speed = 'fast', starSize = 'small' }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  width: `${starPixelSizes[starSize]}px`,
  height: `${starPixelSizes[starSize]}px`,
  background: 'transparent',
  boxShadow: starsBoxShadow(numberOfStars, 'rgba(255, 255, 255, 0.6)'),
  animation: `${starsKeyframe} ${starAnimationSpeeds[speed]}s linear infinite`,
}))
