window.codeScope = 'scatter';

d3.redditChart.scatter = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];
  let radius = 5;

  function chart(container) {
    g = container;

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

    const circles = g.selectAll('circle')
      .data(data);

    const circleAttrs = {
      cx: (d) => xScale(d.created),
      cy: (d) => yRange[1] - yScale(d.score),
      r: radius
    };
    circles.enter()
      .append('circle')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.color.green)
      .attr(circleAttrs);

    circles.exit().remove();
  }

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

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

  chart.radius = function(val) {
    if (!arguments.length) {
      return radius;
    }
    radius = val;
    return chart;
  }

  return chart;
};

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
    .scatter()
    .data(data)
    .xRange([ minWidth, maxWidth ])
    .yRange([ minHeight, maxHeight ])
    .radius(5);

  chart(container);
}
