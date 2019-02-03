import React from 'react'
import { _3d } from 'd3-3d'
import { drag } from 'd3-drag'
import { interpolateNumber } from 'd3-interpolate'
import { randomUniform } from 'd3-random'
import { select, event } from 'd3-selection'
import 'd3-transition'
import { withTheme } from 'emotion-theming'

class ThreeDBarChart extends React.Component {
  shouldComponentUpdate = () => false

  componentDidMount = () => {
    const {
      theme: { palette },
    } = this.props

    const origin = [300, 500]
    const scale = 25
    const startAngle = { x: -Math.PI / 6, y: Math.PI / 4 }

    const gridColumns = 5
    const gridRows = 20

    const gridData = []
    for (let column = 0; column <= gridColumns; column++) {
      for (let row = 0; row < gridRows; row++) {
        gridData.push([row - gridRows / 2, 0.5, column - gridColumns / 2])
      }
    }

    const makeCube = (h, x, z, id) => {
      const result = [
        { x: x - 1, y: h, z: z + 1 }, // FRONT TOP LEFT
        { x: x - 1, y: 0, z: z + 1 }, // FRONT BOTTOM LEFT
        { x: x + 1, y: 0, z: z + 1 }, // FRONT BOTTOM RIGHT
        { x: x + 1, y: h, z: z + 1 }, // FRONT TOP RIGHT
        { x: x - 1, y: h, z: z - 1 }, // BACK  TOP LEFT
        { x: x - 1, y: 0, z: z - 1 }, // BACK  BOTTOM LEFT
        { x: x + 1, y: 0, z: z - 1 }, // BACK  BOTTOM RIGHT
        { x: x + 1, y: h, z: z - 1 }, // BACK  TOP RIGHT
      ]

      result.height = h
      result.id = id
      return result
    }

    const numBars = 6
    const cubesData = []
    let index = 0
    for (let z = 0; z <= 0; z++) {
      for (let x = 0; x < numBars; x++) {
        cubesData.push(makeCube(-randomUniform(2, 20)(), 3 * x - 8, z * 3, index++))
      }
    }

    const cubes3D = _3d()
      .shape('CUBE')
      .x(d => d.x)
      .y(d => d.y)
      .z(d => d.z)
      .rotateY(startAngle.y)
      .rotateX(startAngle.x)
      .origin(origin)
      .scale(scale)

    const grid3D = _3d()
      .shape('GRID', gridRows)
      .origin(origin)
      .rotateY(startAngle.y)
      .rotateX(startAngle.x)
      .scale(scale)

    const draggingTrait = updateFn => {
      let mx, my, mouseX, mouseY

      return drag()
        .on('drag', () => {
          mouseX = mouseX || 0
          mouseY = mouseY || 0
          const beta = ((event.x - mx + mouseX) * Math.PI) / 230
          const alpha = (((event.y - my + mouseY) * Math.PI) / 230) * -1

          updateFn(0, alpha, beta)
        })
        .on('start', () => {
          mx = event.x
          my = event.y
        })
        .on('end', () => {
          mouseX = event.x - mx + mouseX
          mouseY = event.y - my + mouseY
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

    const constructBars = (processedCubesData, transitionDuration) => selection => {
      const cubes = selection
        .select('.cubes')
        .selectAll('g.cube')
        .data(processedCubesData, d => d.id)

      const ce = cubes
        .enter()
        .append('g')
        .attr('class', 'cube')
        .attr('fill', d => palette.colors.visualizations[d.id])
        .attr('stroke', 'white')
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
        .merge(faces)
        .transition()
        .duration(transitionDuration)
        .attr('d', cubes3D.draw)

      faces.exit().remove()

      /* --------- TEXT ---------*/

      const texts = cubes
        .merge(ce)
        .selectAll('text.text')
        .data(d => {
          const _t = d.faces.filter(d => d.face === 'top')
          return [{ height: d.height, centroid: _t[0].centroid }]
        })

      texts
        .enter()
        .append('text')
        .attr('class', 'text')
        .attr('dy', '-.7em')
        .attr('text-anchor', 'middle')
        .attr('x', d => origin[0] + scale * d.centroid.x)
        .attr('y', d => origin[1] + scale * d.centroid.y)
        .merge(texts)
        .transition()
        .duration(transitionDuration)
        .attr('fill', 'black')
        .attr('stroke', 'none')
        .attr('x', d => origin[0] + scale * d.centroid.x)
        .attr('y', d => origin[1] + scale * d.centroid.y)
        .transition()
        .tween('text', function(d) {
          const i = interpolateNumber(+select(this).text(), Math.abs(d.height))
          return t => select(this).text(i(t).toFixed(1))
        })

      texts.exit().remove()

      /* --------- SORT TEXT & FACES ---------*/

      ce.selectAll('._3d').sort(_3d().sort)
    }

    const svg = select('svg')

    const processUpdate = (svg, gridData, cubesData, startAngle) => (transitionDuration = 1000, alpha = 0, beta = 0) => {
      const processedCubesData = cubes3D.rotateY(beta + startAngle.y).rotateX(alpha + startAngle.x)(cubesData)
      const processedGridData = grid3D.rotateY(beta + startAngle.y).rotateX(alpha + startAngle.x)(gridData)

      svg.call(constructGrid(processedGridData))
      svg.call(constructBars(processedCubesData, transitionDuration))
    }

    svg.call(draggingTrait(processUpdate(svg, gridData, cubesData, startAngle)))

    processUpdate(svg, gridData, cubesData, startAngle)()
  }

  render() {
    return (
      <svg
        style={{ width: '100%', height: '100%' }}
        ref={elem => {
          this.svg = elem
        }}
      >
        <g className="grid" />
        <g className="cubes" />
      </svg>
    )
  }
}

export default withTheme(ThreeDBarChart)
