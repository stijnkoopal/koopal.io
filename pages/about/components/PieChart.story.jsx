import React from 'react';
import { storiesOf } from '@storybook/react';
import PieChart from './PieChart';

storiesOf('PieChart', module)
  .add('Default', () => (
    <PieChart />
  ))
