import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Box, Flex } from '@rebass/grid/emotion'

const CircleContainer = styled(Box)({
  position: 'relative',
  width: '64px',
  height: '64px',
  cursor: 'pointer',
  background: '#fff',
  borderRadius: '50%',
})

const BarsContainer = styled(Flex)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '10%',
})

const barHeight = 3

const barShared = ({
  isOpen,
  theme: {
    palette,
    transitions: {
      duration: { short: duration },
    },
  },
}) =>
  css({
    position: 'relative',
    width: '100%',
    height: `${barHeight}px`,
    background: palette.colors.primary,
    transition: isOpen
      ? `margin ${duration}ms, opacity ${duration}ms, transform ${duration}ms ${duration}ms`
      : `transform ${duration}ms, opacity ${duration}ms ${duration}ms, margin ${duration}ms ${duration}ms`,
    margin: isOpen ? 0 : '4px 0',
  })

const Bar1 = styled(Box)(barShared, ({ isOpen }) => ({
  transform: isOpen ? 'rotate(-45deg)' : '',
  top: `${barHeight}px`,
}))

const Bar2 = styled(Box)(barShared, ({ isOpen }) => ({
  opacity: isOpen ? 0 : 1,
}))

const Bar3 = styled(Box)(barShared, ({ isOpen }) => ({
  transform: isOpen ? 'rotate(45deg)' : '',
  top: `-${barHeight}px`,
}))

const BurgerMenuButton = ({ isOpen, onClick, className }) => (
  <CircleContainer onClick={onClick} className={className}>
    <BarsContainer>
      <Bar1 isOpen={isOpen} />
      <Bar2 isOpen={isOpen} />
      <Bar3 isOpen={isOpen} />
    </BarsContainer>
  </CircleContainer>
)

BurgerMenuButton.propTypes = {
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
}

BurgerMenuButton.defaultProps = {
  onClick: () => undefined,
  isOpen: false,
  className: undefined,
}

export default BurgerMenuButton
