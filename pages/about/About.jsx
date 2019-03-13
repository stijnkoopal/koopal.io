import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import Bar3DChart from './components/Bar3DChart'
import useResume from '../_components/useResume'

const PageIndicator = styled(Box)(({ active, theme: { palette, spacing } }) => ({
  borderRadius: '50%',
  background: active ? palette.colors.grey[300] : palette.colors.grey[600],
  width: 2 * spacing.unit,
  height: 2 * spacing.unit,
  marginRight: 1 * spacing.unit,
  border: 0,
})).withComponent('button')

const PageSelectors = styled(Flex)(({ theme: { spacing } }) => ({
  position: 'absolute',
  justifyContent: 'center',
  bottom: 4 * spacing.unit,
  width: 100,
  left: '50%',
  transform: 'translate(-50%, 0)',
}))

const chartData = (resume, type) => {
  if (type === 'skills') return [resume.skills.map(({ name, value }) => ({ label: name, value }))]
  return [resume.interests.map(({ name, value }) => ({ label: name, value }))]
}

const Arrow = styled(Box)(({ right, theme: { spacing, palette } }) => {
  const arrowSize = spacing.unit * 2
  const arrowColor = palette.colors.grey[500]
  return {
    position: 'absolute',
    right: right ? 0 : '',
    left: right ? '' : 0,
    top: '50%',
    marginTop: -arrowSize / 2,
    width: 0,
    height: 0,
    borderTop: `${arrowSize}px solid transparent`,
    borderBottom: `${arrowSize}px solid transparent`,
    borderLeft: right ? `${arrowSize}px solid ${arrowColor}` : 'unset',
    borderRight: right ? 'unset' : `${arrowSize}px solid ${arrowColor}`,
    background: 'transparent',
  }
}).withComponent('button')

const AboutContainer = styled(Flex)(() => ({
  width: '70%',
  margin: '0 auto',
  height: '100%',
}))

const About = () => {
  const [activeChart, setActiveChart] = useState('skills')
  const resume = useResume()

  return (
    <AboutContainer>
      <Bar3DChart data={chartData(resume, activeChart)}/>

      <Arrow onClick={() => setActiveChart(activeChart === 'skills' ? 'personal' : 'skills')}/>

      <PageSelectors>
        {['skills', 'personal'].map(type => (
          <PageIndicator key={type} active={activeChart === type}
                         onClick={() => setActiveChart(type)}/>
        ))}
      </PageSelectors>

      <Arrow right
             onClick={() => setActiveChart(activeChart === 'skills' ? 'personal' : 'skills')}/>
    </AboutContainer>
  )
}

export default About
