d3.redditChart.line = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];

  function chart(container) {
    g = container;

    g.classed('g-line', true);

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

    const line = d3.svg.line()
      .x(d => xScale(d.created))
      .y(d => yRange[1] - yScale(d.score))
      .interpolate('cardinal');

    const path = g.append('path')
      .attr('d', line(data));

    const totalLength = path.node().getTotalLength();

    path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0);
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
