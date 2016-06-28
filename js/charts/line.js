window.redditChart.line = function() {
  let path;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];
  let offset = 0;

  function chart(container) {
    path = container.append('path');
    container.classed('g-line', true);
    chart.render();
  }

  chart.render = function() {
    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range([
        xRange[0] + offset,
        xRange[1] - offset
      ]);

    const yDomain = [0, d3.max(data, d => d.score)];
    const yScale = d3.scale
      .linear()
      .domain(yDomain)
      .range([
        yRange[0] + offset,
        yRange[1] - offset
      ]);

    const line = d3.svg.line()
      .x(d => xScale(d.created))
      .y(d => yRange[1] - yScale(d.score));

    path.attr('d', line(data));

    const totalLength = path.node().getTotalLength();

    path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .ease('quad')
      .duration(window.transitionTime * 3)
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

  chart.offset = function(val) {
    if (!arguments.length) {
      return offset;
    }
    offset = val;
    return chart;
  }

  return chart;
}
