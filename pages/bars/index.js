function visualize({ data }) {
  const redditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const svg = d3.select('svg');

  const minHeight = 10;
  const maxHeight = 450;
  const g = svg.append('g')
    .attr('transform', `translate(${minHeight}, 100)`);

  const maxScore = d3.max(redditData, (d) => d.data.score);

  const yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minHeight, maxHeight]);

  const xScale = d3.scale.ordinal()
    .domain(d3.range(redditData.length))
    .rangeBands([0, maxHeight], 0.5)

  const bars = g.selectAll('rect').data(redditData);
  const rectAttrs = {
    x: (d, i) => xScale(i),
    y: (d, i) => maxHeight - yScale(d.data.score),
    width: xScale.rangeBand(),
    height: (d, i) => yScale(d.data.score)
  };
  bars.enter()
    .append('rect')
    .attr('fill', window.fillColor)
    .attr(rectAttrs);
}
