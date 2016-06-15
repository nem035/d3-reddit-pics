function visualize({ data }) {
  const reditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const svg = d3.select('svg');

  const minHeight = 10;
  const maxHeight = 450;
  const g = svg.append('g')
    .attr('transform', `translate(${minHeight}, 100)`);

  const maxScore = d3.max(reditData, (d) => d.data.score);
  const yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minHeight, maxHeight]);

  const bars = g.selectAll('rect').data(reditData);
  const rectAttrs = {
    x: (d, i) => i * 15,
    y: (d, i) => maxHeight - yScale(d.data.score),
    width: 10,
    height: (d, i) => yScale(d.data.score)
  };
  bars.enter()
    .append('rect')
    .attr(rectAttrs);
}
