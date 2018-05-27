import React from 'react'
import styled from 'react-emotion'

const CenteredSection = styled('section')`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  width: 100%;
  padding: 20px;  
  background: rgba(31,199,255,0.24);
  color: #444;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`

const UnderConstruction = () => (
  <CenteredSection>
    <h1>Under construction</h1>
    <h2>But find me here:</h2>

    <a href="https://github.com/stijnkoopal" target="_blank" rel="noopener noreferrer">
      <img src="/static/github-logo.png" alt="Github" title="Check out my Github" />
    </a>
    <a href="https://medium.com/@stijn.koopal" target="_blank" rel="noopener noreferrer">
      <img src="/static/medium-logo.png" alt="Medium" title="Checkout my Medium" />
    </a>
    <a href="https://www.linkedin.com/in/stijnkoopal" target="_blank" rel="noopener noreferrer">
      <img src="/static/linkedin-logo.png" alt="Linkedin" title="Checkout my Linkedin" />
    </a>
  </CenteredSection>
)

export default UnderConstruction
