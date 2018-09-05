import React from 'react'
import PropTypes from 'prop-types';
import { withFauxDOM } from 'react-faux-dom'
import { pie } from 'd3-shape'
import { hsl } from 'd3-color'
import { select } from 'd3-selection'
import * as transition from 'd3-transition'
import responsiveChart from './responsiveChart.jsx'

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

class PieChart extends React.PureComponent {
  componentDidMount() {
    const group = this.newFauxSvgGroup()

    this.draw(group, randomData())

    const { animateFauxDOM } = this.props
    animateFauxDOM(800)
  }

  render() {
    const { chart } = this.props

    return chart
  }

  newFauxSvgGroup() {
    const { connectFauxDOM } = this.props

    const faux = connectFauxDOM('div', 'chart')

    const svg = select(faux)
      .append('svg')
      .attr('width', this.props.containerWidth)
      .attr('height', this.props.containerWidth)

    return svg.append('g')
  }

  draw(group, data) {
    const x = this.props.containerWidth / 2
    const y = 300
    const width = this.props.containerWidth / 2
    const height = this.props.containerWidth / 10
    const depth = 20
    const innerRadius = 0

    const pieCalculations = new PieCalculations(width, height, depth, innerRadius)
    const pieData = pie().value(d => d.value)(data);

    const slices = group
      .append('g')
      .attr('transform', `translate(${x}, ${y})`)
      .attr('class', 'slices');

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

    slices.selectAll('.text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('class', 'text')
      .attr('x', d => 0.6 * width * Math.cos(0.5 * (d.startAngle + d.endAngle)))
      .attr('y', d => 0.6 * height * Math.sin(0.5 * (d.startAngle + d.endAngle)))
      .text('test')
  }
}

PieChart.defaultProps = {
  chart: 'loading',
  containerWidth: 300,
}

PieChart.propTypes = {
  chart: PropTypes.string,
  containerWidth: PropTypes.number,
  animateFauxDOM: PropTypes.func.isRequired,
  connectFauxDOM: PropTypes.func.isRequired,
}


export default responsiveChart(withFauxDOM(PieChart))
