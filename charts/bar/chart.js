d3.redditChart.bar = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];

  function chart(container) {
    g = container;

    g.classed('g-bar', true);

    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const yDomain = [0, d3.max(data, d => d.score)];
    const yScale = d3.scale
      .linear()
      .domain(yDomain)
      .range(yRange);

    const bars = g.selectAll('rect')
      .data(data);

    const rectAttrs = {
      x: (d) => xScale(d.created),
      y: (d) => yRange[1] - yScale(d.score),
      height: (d) => yScale(d.score)
    };

    bars.enter()
      .append('rect')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr(rectAttrs);

    bars.exit()
      .remove();
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
    .bar()
    .data(data)
    .xRange(xRange)
    .yRange(yRange);

  chart(container);
}
