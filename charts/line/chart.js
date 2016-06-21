window.codeScope = 'line';

d3.chart.line = function() {
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
    const xScale = d3.time.scale()
      .domain(xDomain)
      .range([minWidth, maxWidth]);

    const yDomain = [0, d3.max(data, d => d.score)];
    const yScale = d3.scale.linear()
      .domain(yDomain)
      .range([minHeight, maxHeight]);

    const line = d3.svg.line()
      .x(d => xScale(d.created))
      .y(d => yScale(d.score))
      .interpolate('cardinal');

    const path = g.append('path')
      .attr('d', line(data))
      .style({
        fill: 'none',
        stroke: window.fillColor,
        'stroke-width': '5px'
      });

    const totalLength = path.node().getTotalLength();

    path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(window.transitionTime)
      .attr('stroke-dashoffset', 0);
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
