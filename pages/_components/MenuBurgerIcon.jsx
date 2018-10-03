import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

const Path = styled.path(({ theme: { transitions, palette } }) => `
  fill: none; 
  transition: 
    stroke-dashoffset ${transitions.duration.enteringScreen}ms ${transitions.easing.sharp}, 
    stroke-dasharray ${transitions.duration.enteringScreen}ms ${transitions.easing.sharp}; 
  stroke-width: 40px; 
  stroke-linecap: round; 
  stroke: ${palette.primary.main}; 
`)

const OuterPath = styled(Path)(({ isOpen }) => `
  stroke-dasharray: 240px 950px; 
  stroke-dashoffset: ${isOpen ? -650 : 0}px;
`)

const MiddlePath = styled(Path)(({ isOpen }) => `
  stroke-dasharray: ${isOpen ? '1px 220px' : '240px 240px'}; 
  stroke-dashoffset: ${isOpen ? -115 : 0}px;
`)

const BurgerMenuButton = ({ isOpen }) => (
  <svg viewBox="0 0 800 600" className={css`transform: translate3d(0, 0, 0)`}>
    <OuterPath isOpen={isOpen} d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" />
    <MiddlePath isOpen={isOpen} d="M300,320 L540,320" />
    <OuterPath
      isOpen={isOpen}
      d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
      transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
    />
  </svg>
)

BurgerMenuButton.propTypes = {
  isOpen: PropTypes.bool,
}

BurgerMenuButton.defaultProps = {
  isOpen: false,
}

export default BurgerMenuButton
