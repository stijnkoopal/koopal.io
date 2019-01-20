import React from 'react'
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import { withTheme } from 'emotion-theming'
import styled from '@emotion/styled'

const Styled = styled(ResponsiveContainer)(({ theme: { typography } }) => ({
  tspan: {
    ...typography.body2,
  },
}))

const ResponsiveRadarChart = ({ data, theme: { palette } }) => (
  <Styled with="100%" height="100%">
    <RadarChart data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar dataKey="value" stroke="#8884d8" fill={palette.colors.secondary} fillOpacity={0.8} />
    </RadarChart>
  </Styled>
)

ResponsiveRadarChart.defaultProps = {
  data: [],
}

export default withTheme(ResponsiveRadarChart)
