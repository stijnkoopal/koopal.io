import React from 'react'
import PropTypes from 'prop-types'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { Box } from '@rebass/grid/dist/emotion'
import seedrandom from 'seedrandom'

const starsKeyframe = keyframes`
  from { transform: translateY(0px) }
  to { transform: translateY(-2000px) }
`

const starsBoxShadow = (rng, n, starColor = '#FFF') =>
  new Array(n)
    .fill(0)
    .map(_ => `${Math.ceil(rng() * 2000)}px ${Math.ceil(rng() * 2000)}px ${starColor}`)
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

const Stars = styled(Box)(({ numberOfStars, speed, starSize, seed }) => ({
  position: 'absolute',
  left: 0,
  top: 0,
  borderRadius: '50%',
  width: `${starPixelSizes[starSize]}px`,
  height: `${starPixelSizes[starSize]}px`,
  background: 'transparent',
  boxShadow: starsBoxShadow(seedrandom(seed), numberOfStars, 'rgba(255, 255, 255, 0.6)'),
  animation: `${starsKeyframe} ${starAnimationSpeeds[speed]}s linear infinite`,
})).withComponent('div')

Stars.propTypes = {
  numberOfStars: PropTypes.number,
  speed: PropTypes.oneOf(['no', 'slow', 'medium', 'fast']),
  starSize: PropTypes.oneOf(['small', 'medium', 'large']),
  seed: PropTypes.number,
}

Stars.defaultProps = {
  numberOfStars: 20,
  speed: 'fast',
  starSize: 'small',
}

export default Stars
