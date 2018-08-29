import React from 'react'
import { withFauxDOM } from 'react-faux-dom'
import { pie } from 'd3-shape'
import { hsl } from 'd3-color'
import { select } from 'd3-selection'
import * as transition from 'd3-transition'

const moveTo = (x, y) => `M ${x} ${y}`
const lineTo = (x, y) => `L ${x} ${y}`
const arc = (rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y) => `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
const closePath = () => 'z'

class PieCalculations {
  constructor(width, height, depth, innerRadius) {
    this.width = width
    this.height = height
    this.depth = depth
    this.innerRadius = innerRadius
  }

  calcXY(startAngle, endAngle, multiplier = 1) {
    const startX = multiplier * this.width * Math.cos(startAngle)
    const startY = multiplier * this.height * Math.sin(startAngle)
    const endX = multiplier * this.width * Math.cos(endAngle)
    const endY = multiplier * this.height * Math.sin(endAngle)

    return {
      startX, startY, endX, endY,
    }
  }

  top(d) {
    if (d.endAngle - d.startAngle === 0) return moveTo(0, 0);
    const {
      startX, startY, endX, endY,
    } = this.calcXY(d.startAngle, d.endAngle)

    const largeArc = (d.endAngle - d.startAngle > Math.PI ? 1 : 0)
    return [
      moveTo(startX, startY),
      arc(this.width, this.height, 0, largeArc, 1, endX, endY),
      lineTo(this.innerRadius * endX, this.innerRadius * endY),
      arc(this.innerRadius * this.width, this.innerRadius * this.height, 0, largeArc, 0, this.innerRadius * startX, this.innerRadius * startY),
      closePath(),
    ].join(' ')
  }

  outer(d) {
    const startAngle = Math.min(d.startAngle, Math.PI)
    const endAngle = Math.min(d.endAngle, Math.PI)

    const {
      startX, startY, endX, endY,
    } = this.calcXY(startAngle, endAngle)

    return [
      moveTo(startX, this.depth + startY),
      arc(this.width - 0.5, this.height - 0.5, 0, 0, 1, endX, this.depth + endY),
      lineTo(endX, endY),
      arc(this.width - 0.5, this.height - 0.5, 0, 0, 0, startX, startY),
      closePath(),
    ].join(' ')
  }

  inner(d) {
    const startAngle = Math.max(d.startAngle, Math.PI)
    const endAngle = Math.max(d.endAngle, Math.PI)

    const {
      startX, startY, endX, endY,
    } = this.calcXY(startAngle, endAngle, this.innerRadius)

    return [
      moveTo(startX, startY),
      arc(this.innerRadius * (this.width + 0.5), this.innerRadius * (this.height + 0.5), 0, 0, 1, endX, endY),
      lineTo(endX, this.depth + endY),
      arc(this.innerRadius * (this.width + 0.5), this.innerRadius * (this.height + 0.5), 0, 0, 0, startX, this.depth + startY),
      closePath(),
    ].join(' ')
  }
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
    const width = 130
    const height = 100
    const depth = 20
    const innerRadius = 0

    const pieCalculations = new PieCalculations(width, height, depth, innerRadius)
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
      .attr('d', d => pieCalculations.inner(d))

    slices.selectAll('.topSlice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'topSlice')
      .style('fill', d => d.data.color)
      .style('stroke', d => d.data.color)
      .attr('d', d => pieCalculations.top(d))

    slices.selectAll('.outerSlice')
      .data(pieData)
      .enter()
      .append('path')
      .attr('class', 'outerSlice')
      .style('fill', d => hsl(d.data.color).darker(0.7))
      .attr('d', d => pieCalculations.outer(d))

    slices.selectAll('.percent')
      .data(pieData)
      .enter()
      .append('text')
      .attr('class', 'percent')
      .attr('x', d => 0.6 * width * Math.cos(0.5 * (d.startAngle + d.endAngle)))
      .attr('y', d => 0.6 * height * Math.sin(0.5 * (d.startAngle + d.endAngle)))
      .text('test')
  }
}

PieChart.defaultProps = {
  chart: 'loading',
}

export default withFauxDOM(PieChart)
