import React from 'react'
import { Box, Flex } from '@rebass/grid/emotion'
import styled from '@emotion/styled'
import ResponsiveRadarChart from './components/ResponsiveRadarChart'

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
  marginLeft: -50,
}))

const chartData = {
  skills: [
    {
      subject: 'Backend', value: 120,
    },
    {
      subject: 'Frontend', value: 98,
    },
    {
      subject: 'Cloud', value: 86,
    },
    {
      subject: 'CI/CD', value: 99,
    },
    {
      subject: 'Agile', value: 85,
    },
  ],
  personal: [
    {
      subject: 'Test', value: 12,
    },
    {
      subject: 't', value: 10,
    },
    {
      subject: '233', value: 190,
    },
    {
      subject: 'CI/CsdD', value: 44,
    },
    {
      subject: 'bla', value: 23,
    },
    {
      subject: '3434d', value: 23,
    },
  ],
}

const Arrow = styled(Box)(({ right, theme: { spacing, palette } }) => {
  const arrowSize = spacing.unit * 2
  const arrowColor = palette.colors.grey[500]
  return ({
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
  })
}).withComponent('button')

class About extends React.Component {
  state = {
    activeChart: 'skills',
  }

  changeActiveChart = type => this.setState(() => ({ activeChart: type }))

  nextActiveChart = () => this.setState(({ activeChart }) => ({ activeChart: activeChart === 'skills' ? 'personal' : 'skills' }))

  render() {
    const { activeChart } = this.state

    return (
      <>
        <ResponsiveRadarChart data={chartData[activeChart]} />

        <Arrow onClick={this.nextActiveChart} />

        <PageSelectors>
          {
            ['skills', 'personal'].map(type => (
              <PageIndicator
                key={type}
                active={activeChart === type}
                onClick={() => this.changeActiveChart(type)}
              />
            ))
          }
        </PageSelectors>

        <Arrow right onClick={this.nextActiveChart} />

        {/* <p> */}
        {/* I&apos;ve always had a profound interest for computers and math; be it games, programming, */}
        {/* messing around or just searching the great internet. */}
        {/* While gaming eventually went away, the rest was there to stay. */}
        {/* Computer technology excite me, especially things related to the web. */}
        {/* </p> */}

        {/* <p> */}
        {/* After finishing my master in computer science, things started to get less theoretical real fast. */}
        {/* I started out as technical engineer in the Java stack. */}
        {/* Currently, I have experience in both front- and backend; */}
        {/* there aren&apos;t a whole lot of languages/platforms/paradigms that I didn&apos;t touch. */}
        {/* </p> */}

        {/* <p> */}
        {/* In my free time I tend to be outside a lot, especially exercising. */}
        {/* Also playing around with my kid and drinking beer with friends is high on the agenda. */}
        {/* </p> */}

        {/* <ul> */}
        {/* <li> */}
        {/* Are you curious? Contact me! */}
        {/* </li> */}
        {/* <li> */}
        {/* Need someone to help you and your software get to the next level? Contact me! */}
        {/* </li> */}
        {/* <li> */}
        {/* Anything related to software development and its process? Contact me! */}
        {/* </li> */}
        {/* <li> */}
        {/* Basically, it comes to this: I can help you! */}
        {/* </li> */}
        {/* </ul> */}
      </>
    )
  }
}

export default About
