import React from 'react'
import styled from 'react-emotion'

const Path = styled.path(({ theme: { palette } }) => `
  fill: none; 
  transition: stroke-dashoffset 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25), stroke-dasharray 0.5s cubic-bezier(0.25, -0.25, 0.75, 1.25); 
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

const ContainerButton = styled.button`
  border: 0;
  background: none;
  outline: none;
  padding: 0;
  width: 100px;
`

const MenuBurgerIcon = ({ isOpen, onClick }) => (
  <ContainerButton type="button" onClick={onClick} tabIndex="0">
    <svg viewBox="0 0 800 600" transform="translate3d(0, 0, 0);">
      <OuterPath isOpen={isOpen} d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" />
      <MiddlePath isOpen={isOpen} d="M300,320 L540,320" />
      <OuterPath
        isOpen={isOpen}
        d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190"
        transform="translate(480, 320) scale(1, -1) translate(-480, -318)"
      />
    </svg>
  </ContainerButton>
)

export default MenuBurgerIcon
