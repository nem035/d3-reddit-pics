window.codeScope = 'scatter';

d3.chart.scatter = function() {
  let data;

  function chart(config) {
    const {
      container,
      radius = 6
    } = config;

    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = getContainerDim(container);

    const g = container.append('svg')
      .append('g')
      .attr('transform', `translate(${minHeight}, 0)`);

    const xDomain = d3.extent(data, d => d.created);
    const xRange = [ minWidth, maxWidth ];
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const yDomain = [0, d3.max(data, d => d.score)];
    const yRange = [ minHeight, maxHeight ];
    const yScale = d3.scale
      .linear()
      .domain(yDomain)
      .range(yRange);

    const circles = g.selectAll('circle')
      .data(data);

    const circleAttrs = {
      cx: (d) => xScale(d.created),
      cy: (d) => maxHeight - yScale(d.score),
      r: radius
    };
    circles.enter()
      .append('circle')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.fillColor)
      .attr(circleAttrs);

    circles.exit().remove();
  }

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

  return chart;
};
