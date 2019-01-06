import React from 'react'
import {
  ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis,
} from 'recharts'
import { withTheme } from 'emotion-theming'
import styled from 'react-emotion'

const data = [
  {
    subject: 'Math', value: 120, fullMark: 150,
  },
  {
    subject: 'Chinese', value: 98, fullMark: 150,
  },
  {
    subject: 'English', value: 86, fullMark: 150,
  },
  {
    subject: 'Geography', value: 99, fullMark: 150,
  },
  {
    subject: 'Physics', value: 85, fullMark: 150,
  },
  {
    subject: 'History', value: 65, fullMark: 150,
  },
];

const Styled = styled(ResponsiveContainer)(({ theme: { typography } }) => ({
  tspan: {
    ...typography.body2,
  },
}))

const ResponsiveRadarChart = ({ theme: { palette } }) => (
  <Styled with="100%" height="100%">
    <RadarChart data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <Radar dataKey="value" stroke="#8884d8" fill={palette.colors.secondary} fillOpacity={0.8} />
    </RadarChart>
  </Styled>
)

export default withTheme(ResponsiveRadarChart)
