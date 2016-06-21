window.codeScope = 'axis';

d3.chart.axis = function() {
  let data;

  function chart(config) {
    const {
      container
    } = config;

    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = getContainerDim(container);

    const xDomain = d3.extent(data, d => d.created);
    const xRange = [ minWidth, maxWidth ];
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const yDomain = [d3.max(data, d => d.score), 0];
    const yRange = [ minHeight, maxHeight ];
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

    const svg = container.append('svg');

    const xPadding = 20;
    const yPadding = 0;

    const gX = svg.append('g')
      .classed('g-x-axis', true)
      .attr('transform', `translate(-40, ${maxHeight + yPadding})`)
      .style({
        fill: 'none',
        'stroke': '#b0bec5'
      });

    const gY = svg.append('g')
      .classed('g-y-axis', true)
      .attr('transform', `translate(60, ${yPadding})`)
      .transition()
      .duration(window.transitionTime)
      .style({
        fill: 'none',
        'stroke': window.fillColor
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

  return chart;
}
