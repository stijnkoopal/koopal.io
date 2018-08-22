import React from 'react'
import { withFauxDOM } from 'react-faux-dom'
import { pie } from 'd3-shape'
import { hsl } from 'd3-color'
import { select } from 'd3-selection'
import * as transition from 'd3-transition'

const pieTop = (d, rx, ry, ir) => {
  if (d.endAngle - d.startAngle === 0) return 'M 0 0';
  const sx = rx * Math.cos(d.startAngle)
  const sy = ry * Math.sin(d.startAngle)
  const ex = rx * Math.cos(d.endAngle)
  const ey = ry * Math.sin(d.endAngle)

  const ret = [];
  ret.push('M', sx, sy, 'A', rx, ry, '0', (d.endAngle - d.startAngle > Math.PI ? 1: 0), '1', ex, ey, 'L', ir * ex, ir * ey);
  ret.push('A', ir * rx, ir * ry, '0', (d.endAngle - d.startAngle > Math.PI ? 1: 0), '0', ir * sx, ir * sy, 'z');
  return ret.join(' ');
}

const pieOuter = (d, rx, ry, h ) => {
  const startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
  const endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

  const sx = rx * Math.cos(startAngle)
  const sy = ry * Math.sin(startAngle)
  const ex = rx * Math.cos(endAngle)
  const ey = ry * Math.sin(endAngle);

  const ret = [];
  ret.push('M', sx, h + sy, 'A', rx, ry, '0 0 1', ex, h + ey, 'L', ex, ey, 'A', rx, ry, '0 0 0', sx, sy, 'z');
  return ret.join(' ');
}

const pieInner = (d, rx, ry, h, ir ) => {
  const startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
  const endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

  const sx = ir * rx * Math.cos(startAngle)
  const sy = ir * ry * Math.sin(startAngle)
  const ex = ir * rx * Math.cos(endAngle)
  const ey = ir * ry * Math.sin(endAngle);

  const ret = [];
  ret.push('M', sx, sy, 'A', ir * rx, ir * ry, '0 0 1', ex, ey, 'L', ex, h + ey, 'A', ir * rx, ir * ry, '0 0 0', sx, h + sy, 'z');
  return ret.join(' ');
}

const randomData = () => {
  const salesData = [
    { label: 'Basic', color: '#3366CC' },
    { label: 'Plus', color: '#DC3912' },
    { label: 'Lite', color: '#FF9900' },
    { label: 'Elite', color: '#109618' },
    { label: 'Delux', color: '#990099' },
  ]

  return salesData.map(d => ({ label: d.label, value: 1000 * Math.random(), color: d.color }));
}

class PieChart extends React.Component {
  componentDidMount() {
    const { connectFauxDOM, animateFauxDOM } = this.props
    const faux = connectFauxDOM('div', 'chart')

    const svg = select(faux)
      .append('svg')
      .attr('width', 700)
      .attr('height', 300)

    const group = svg.append('g')
      .attr('id', 'pie');

    this.draw(group, randomData())

    animateFauxDOM(800)
  }

  render() {
    const { chart } = this.props
    return chart
  }

  draw(group, data) {
    const x = 150
    const y = 150
    const rx = 130
    const ry = 100
    const h = 20
    const ir = 0

    const pieData = pie().value(d => d.value)(data);

    const slices = group
      .append('g')
      .attr('transform', `translate(${x}, ${y})`)
      .attr('class', 'slices');

    slices.selectAll('.innerSlice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'innerSlice')
      .style('fill', d => hsl(d.data.color).darker(0.7))
      .attr('d', d => pieInner(d, rx + 0.5, ry + 0.5, h, ir))

    slices.selectAll('.topSlice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'topSlice')
      .style('fill', d => d.data.color)
      .style('stroke', d => d.data.color)
      .attr('d', d => pieTop(d, rx, ry, ir))

    slices.selectAll('.outerSlice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'outerSlice')
      .style('fill', d => hsl(d.data.color).darker(0.7))
      .attr('d', d => pieOuter(d, rx - 0.5, ry - 0.5, h))

    slices.selectAll('.percent')
      .data(pieData)
      .enter()
      .append('text')
      .attr('class', 'percent')
      .attr('x', d => 0.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle)))
      .attr('y', d => 0.6 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle)))
      .text('test')
  }
}

PieChart.defaultProps = {
  chart: 'loading',
}

export default withFauxDOM(PieChart)
