import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from './PieChart.jsx';

storiesOf('PieChart', module)
  .add('Default', () => (
    <PieChart />
  ))
