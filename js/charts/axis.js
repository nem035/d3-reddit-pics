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
      .orient('left')
      .tickSize(0);

    const [ min, max ] = xDomain;
    const tickValues = [min, min + (max - min) / 2, max].map(ms => new Date(ms));
    const xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient('bottom')
      .tickSize(0)
      .tickValues(tickValues)
      .tickFormat(window.timeFormat);

    const gX = container.append('g')
      .classed('axis x-axis', true)
      .attr('transform', `translate(0, ${yRange[1]})`);

    const gY = container.append('g');

    gY.classed('axis y-axis', true)
      .attr('transform', `translate(${xRange[0]}, 0)`);

    gY.append('text')
      .classed('axis-text', true)
      .attr('y', 10) // 10 is half of the margin of viz-container
      .attr('x', window.xAxisSpacing + 5)
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
