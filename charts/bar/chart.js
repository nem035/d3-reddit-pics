window.codeScope = 'bar';

d3.chart.bar = function() {
  let data;

  function chart(config) {
    const {
      container,
      barWidth = 5
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

    const bars = g.selectAll('rect')
      .data(data);

    const rectAttrs = {
      x: (d) => xScale(d.created),
      y: (d) => maxHeight - yScale(d.score),
      width: barWidth,
      height: (d) => yScale(d.score)
    };

    bars.enter()
      .append('rect')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.fillColor)
      .attr(rectAttrs);
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  }

  return chart;
}
