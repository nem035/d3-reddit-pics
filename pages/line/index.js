function visualize({ data }) {
  const redditData = data.children
    .map(d => d.data.score)
    .sort((a, b) => a - b);

  const svg = d3.select('svg');

  const minHeight = 50;
  const maxHeight = 450;
  const g = svg.append('g')
    .attr('transform', `translate(${minHeight}, 0)`);

  const yScale = d3.scale.linear()
    .domain(d3.extent(redditData))
    .range([minHeight, maxHeight]);

  const xScale = d3.scale.ordinal()
    .domain(d3.range(redditData.length))
    .rangeBands([0, maxHeight]);

  const line = d3.svg.line()
    .x((score, idx) => xScale(idx))
    .y(yScale)
    .interpolate('cardinal');

  g.append('path')
    .transition()
    .duration(window.transitionTime)
    .attr('d', line(redditData))
    .style({
      fill: 'none',
      stroke: window.fillColor,
      'stroke-width': '5px'
    });
}
