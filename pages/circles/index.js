function visualize({ data }) {
  const reditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const svg = d3.select('svg');

  const minHeight = 50;
  const maxHeight = 450;
  const g = svg.append('g')
    .attr('transform', `translate(${minHeight}, 0)`);

  const maxScore = d3.max(reditData, (d) => d.data.score);
  const yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minHeight, maxHeight]);

  const circles = g.selectAll('circle').data(reditData);
  const circleAttrs = {
    cx: (d, i) => i * 15,
    cy: (d, i) => yScale(d.data.score),
    r: 6
  };
  circles.enter()
    .append('circle')
    .attr('fill', window.fillColor)
    .attr(circleAttrs);
}
