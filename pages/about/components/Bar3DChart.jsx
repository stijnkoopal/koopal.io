import React from 'react'
import PropTypes from 'prop-types'
import { _3d } from 'd3-3d'
import { drag } from 'd3-drag'
import { select, event } from 'd3-selection'
import 'd3-transition'
import { withTheme } from 'emotion-theming'

const INITIAL_SVG_WIDTH = 960
const INITIAL_SVG_HEIGHT = 500
const MAX_BAR_HEIGHT = 20
const PLANE_Z = MAX_BAR_HEIGHT / 1.8

class Bar3DChart extends React.Component {
  // We will use d3 for rendering and stuff
  // shouldComponentUpdate = () => false

  containerRect = () =>
    select(this.container)
      .node()
      .getBoundingClientRect()

  // We use the preserveAspectRatio of svg, so for responsiveness update the width/height of the svg
  resize = () => {
    const { width, height } = this.containerRect()

    select(this.svg)
      .attr('width', width)
      .attr('height', height)
  }

  buildGridData = (numColumns, numsRows, size, zPlane) => {
    const gridData = []
    for (let column = -numColumns / 2; column <= numColumns / 2; column++) {
      for (let row = -numsRows / 2 + 1; row <= numsRows / 2; row++) {
        gridData.push([row * size, 0.5 + zPlane, size * column])
      }
    }
    return gridData
  }

  normalizeData = (data) => {
    const maxValue = data.reduce((acc, rows) => Math.max(acc, ...rows.map(({value}) => value)), 0)

    return data.map(rows => rows.map(({label, value}) => ({
      value: value/ maxValue * MAX_BAR_HEIGHT,
      label,
    })))
  }

  maxNumberOfRows = (data) => data.reduce((acc, rows) => Math.max(acc, rows.length), 0)

  buildCubesData = (data, colors, barWidth, barDepth, spaceBetweenBarsX, spaceBetweenBarsZ) => {
    const makeCube = (h, x, z) => {
      const halfWidth = barWidth / 2
      const halfDepth = barDepth / 2

      return [
        { x: x - halfWidth, y: h, z: z + halfDepth }, // FRONT TOP LEFT
        { x: x - halfWidth, y: 0, z: z + halfDepth }, // FRONT BOTTOM LEFT
        { x: x + halfWidth, y: 0, z: z + halfDepth }, // FRONT BOTTOM RIGHT
        { x: x + halfWidth, y: h, z: z + halfDepth }, // FRONT TOP RIGHT
        { x: x - halfWidth, y: h, z: z - halfDepth }, // BACK  TOP LEFT
        { x: x - halfWidth, y: 0, z: z - halfDepth }, // BACK  BOTTOM LEFT
        { x: x + halfWidth, y: 0, z: z - halfDepth }, // BACK  BOTTOM RIGHT
        { x: x + halfWidth, y: h, z: z - halfDepth }, // BACK  TOP RIGHT
      ]
    }

    const result = []
    for (let z = 0; z < data.length; z++) {
      for (let x = 0; x < data[z].length; x++) {
        const cube = makeCube(
          -data[z][x].value,
          (x - data[z].length / 2 + 0.5) * (spaceBetweenBarsX + barWidth),
          (z - data.length / 2 + 0.5) * (spaceBetweenBarsZ + barDepth)
        )
        cube.label = data[z][x].label
        cube.id = result.length
        cube.color = colors[result.length]
        result.push(cube)
      }
    }
    return result
  }

  componentWillUnmount = () => window.removeEventListener('resize', this.resize)

  componentDidMount = () => {
    window.addEventListener('resize', this.resize)
    this.resize()
  }

  componentDidUpdate = () => {
    const {
      theme: { palette },
      barWidth,
      barDepth,
      spaceBetweenBarsX,
      spaceBetweenBarsZ,
      startAngle,
      data
    } = this.props

    const { width: containerWidth, height: containerHeight } = this.containerRect()
    const aspectRatio = containerWidth / containerHeight

    // Aspect ratio is very different on mobile/desktop, so account for that
    // Note that this value is not updated on resize, full rerender is required
    const SCALE = 30 + (aspectRatio < 0.7 ? 15 : 0)
    const gridSize = barWidth / 2

    // Middle of svg is the point we want to rotate around
    const rotateAround = [INITIAL_SVG_WIDTH / 2, INITIAL_SVG_HEIGHT / 2]

    const numberOfColumns = data.length * (2 + spaceBetweenBarsZ + barDepth)
    const numberOfRows = this.maxNumberOfRows(data) * (2 + spaceBetweenBarsX + barWidth) - 2
    const gridData = this.buildGridData(numberOfColumns, numberOfRows, gridSize, PLANE_Z)

    const cubesData = this.buildCubesData(
      this.normalizeData(data),
      palette.colors.visualizations,
      barWidth,
      barDepth,
      spaceBetweenBarsX,
      spaceBetweenBarsZ,
    )

    const cubes3D = _3d()
      .shape('CUBE')
      .x(d => d.x)
      .y(d => d.y + PLANE_Z)
      .z(d => d.z)
      .rotateY(startAngle.y)
      .rotateX(startAngle.x)
      .rotateZ(startAngle.z)
      .origin(rotateAround)
      .scale(SCALE)

    const grid3D = _3d()
      .shape('GRID', numberOfRows)
      .origin(rotateAround)
      .rotateY(startAngle.y)
      .rotateX(startAngle.x)
      .rotateZ(startAngle.z)
      .scale(SCALE)

    const draggingTrait = updateFn => {
      let mx, my, mouseX, mouseY

      return drag()
        .on('drag', () => {
          mouseX = mouseX || 0
          mouseY = mouseY || 0
          const beta = ((event.x - mx + mouseX) * Math.PI) / 230
          const alpha = (((event.y - my + mouseY) * Math.PI) / 230) * -1

          updateFn(alpha, beta)
        })
        .on('start', () => {
          mx = event.x
          my = event.y
        })
        .on('end', () => {
          mouseX = event.x - mx + mouseX
          mouseY = event.y - my + mouseY
        })
        .touchable(function() {
          return 'ontouchstart' in this
        })
    }

    const constructGrid = processedGridData => selection => {
      const gridSelection = selection
        .select('.grid')
        .selectAll('path.grid')
        .data(processedGridData, d => d.id)

      gridSelection
        .enter()
        .append('path')
        .attr('class', '_3d grid')
        .merge(gridSelection)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.3)
        .attr('fill', 'lightgray')
        .attr('fill-opacity', 0.1)
        .attr('d', grid3D.draw)

      gridSelection.exit().remove()
    }

    const constructBars = processedCubesData => selection => {
      const cubes = selection
        .select('.cubes')
        .selectAll('g.cube')
        .data(processedCubesData, d => d.id)

      const ce = cubes
        .enter()
        .append('g')
        .attr('class', 'cube')
        .attr('fill', d => d.color)
        .attr('stroke', 'white')
        .classed('_3d', true)
        .merge(cubes)
        .sort(cubes3D.sort)

      cubes.exit().remove()

      /* --------- FACES ---------*/

      const faces = cubes
        .merge(ce)
        .selectAll('path.face')
        .data(d => d.faces, d => d.face)

      faces
        .enter()
        .append('path')
        .attr('class', 'face')
        .attr('fill-opacity', 0.95)
        .classed('_3d', true)
        .merge(faces)
        .attr('d', cubes3D.draw)

      faces.exit().remove()

      /* --------- TEXT ---------*/

      const texts = cubes
        .merge(ce)
        .selectAll('text.text')
        .data(d => {
          const topFace = d.faces.find(d => d.face === 'top')
          return [{ label: d.label, centroid: topFace.centroid }]
        })

      texts
        .enter()
        .append('text')
        .attr('class', 'text')
        .attr('dy', '-.7em')
        .attr('text-anchor', 'start')
        .attr('x', d => rotateAround[0] + SCALE * d.centroid.x)
        .attr('y', d => rotateAround[1] + SCALE * d.centroid.y)
        .classed('_3d', true)
        .merge(texts)
        .attr('fill', 'white')
        .attr('stroke', 'none')
        .attr(
          'transform',
          d => `rotate(315, ${rotateAround[0] + SCALE * d.centroid.x}, ${rotateAround[1] + SCALE * d.centroid.y})`,
        )
        .attr('style', 'font-size: 2rem')
        .attr('x', d => rotateAround[0] + SCALE * d.centroid.x)
        .attr('y', d => rotateAround[1] + SCALE * d.centroid.y)
        .text(d => d.label)

      texts.exit().remove()

      /* --------- SORT TEXT & FACES ---------*/

      ce.selectAll('._3d').sort(_3d().sort)
    }

    const svg = select('svg')

    const processUpdate = (svg, gridData, cubesData, startAngle) => (
      alpha = 0,
      beta = 0,
    ) => {
      const processedCubesData = cubes3D.rotateY(beta + startAngle.y).rotateX(alpha + startAngle.x)(cubesData)
      const processedGridData = grid3D.rotateY(beta + startAngle.y).rotateX(alpha + startAngle.x)(gridData)

      svg.call(constructGrid(processedGridData))
      svg.call(constructBars(processedCubesData))
    }

    svg.call(draggingTrait(processUpdate(svg, gridData, cubesData, startAngle)))

    processUpdate(svg, gridData, cubesData, startAngle)()
  }

  render() {
    // We need a container element for responsiveness, svg's size is updated with window.on('resize')
    return (
      <container
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'grab' }}
        ref={elem => (this.container = elem)}
      >
        <svg
          width={INITIAL_SVG_WIDTH}
          height={INITIAL_SVG_HEIGHT}
          viewBox={`0 0 ${INITIAL_SVG_WIDTH} ${INITIAL_SVG_HEIGHT}`}
          ref={elem => (this.svg = elem)}
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="grid" />
          <g className="cubes" />
        </svg>
      </container>
    )
  }
}

Bar3DChart.propTypes = {
  barWidth: PropTypes.number,
  barDepth: PropTypes.number,
  spaceBetweenBarsX: PropTypes.number,
  spaceBetweenBarsZ: PropTypes.number,
  startAngle: PropTypes.shape({
    x: PropTypes.number.required,
    y: PropTypes.number.required,
    z: PropTypes.number.required,
  }),
}

Bar3DChart.defaultProps = {
  barWidth: 2,
  barDepth: 2,
  spaceBetweenBarsX: 1,
  spaceBetweenBarsZ: 1,
  startAngle: {
    x: -Math.PI / 8,
    y: -Math.PI / 4,
    z: 0,
  },
}
export default withTheme(Bar3DChart)
