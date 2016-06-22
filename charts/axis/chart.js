d3.redditChart.axis = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];

  function chart(container) {
    g = container;

    g.classed('g-axis', true);

    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const yDomain = [ d3.max(data, d => d.score), 0 ];
    const yScale = d3.scale
      .linear()
      .domain(yDomain)
      .range(yRange);

    const yAxis = d3.svg
      .axis()
      .scale(yScale)
      .orient('left');

    const xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient('bottom');

    const gX = container.append('g');

    gX.classed('axis x-axis', true)
      .attr('transform', `translate(0, ${yRange[1]})`);

    gX.append('text')
      .classed('axis-text', true)
      .attr('y', -10)
      .attr('x', xRange[1] - 40)
      .text('Time');

    const gY = container.append('g');

    gY.classed('axis y-axis', true)
      .attr('transform', `translate(${xRange[0]}, 0)`);

    gY.append('text')
      .classed('axis-text', true)
      .attr('y', 20)
      .attr('x', 10)
      .text('Score');

    yAxis(gY);
    xAxis(gX);
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  }

  chart.xRange = function(val) {
    if (!arguments.length) {
      return xRange;
    }
    xRange = val;
    return chart;
  }

  chart.yRange = function(val) {
    if (!arguments.length) {
      return yRange;
    }
    yRange = val;
    return chart;
  }

  return chart;
}

function loadExample(data) {

  const container = d3.select('.viz-container')
    .append('svg');

  const {
    xRange,
    yRange,
  } = getContainerDim(container);

  const chart = d3.redditChart
    .axis()
    .data(data)
    .xRange(xRange)
    .yRange(yRange);

  chart(container);
}
