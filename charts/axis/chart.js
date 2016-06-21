d3.redditChart.axis = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];

  function chart(container) {
    g = container;

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

    const gX = container.append('g')
      .classed('g-x-axis', true)
      .attr('transform', `translate(-40, ${yRange[1]})`)
      .style({
        fill: 'none',
        'stroke': window.color.gray
      });

    const gY = container.append('g')
      .classed('g-y-axis', true)
      .attr('transform', `translate(60, 0)`)
      .transition()
      .duration(window.transitionTime)
      .style({
        fill: 'none',
        'stroke': window.color.green
      });

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
    .append(`svg`);

  const {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight
  } = getContainerDim(container);

  const chart = d3.redditChart
    .axis()
    .data(data)
    .xRange([ minWidth, maxWidth ])
    .yRange([ minHeight, maxHeight ]);

  chart(container);
}
