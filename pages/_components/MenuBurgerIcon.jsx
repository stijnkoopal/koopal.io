import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

const Path = styled.path(({ theme: { transitions, palette } }) => `
  fill: none; 
  transition: 
    stroke-dashoffset ${transitions.duration.enteringScreen}ms ${transitions.easing.sharp}, 
    stroke-dasharray ${transitions.duration.enteringScreen}ms ${transitions.easing.sharp}; 
  stroke-width: 40px; 
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
    <OuterPath isOpen={isOpen} d="M0,20 C0,20 220,20 240,20 C440,20 340,340 220,220 C140,140 0,0 0,0" />
    <MiddlePath isOpen={isOpen} d="M0,120 L240,120" />
    <OuterPath
      isOpen={isOpen}
      d="M0,10 C0,10 220,10 240,10 C440,10 340,330 220,210 C140,130 0,-10 0,-10"
      transform="translate(180, 120) scale(1, -1) translate(-180, -118)"
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
