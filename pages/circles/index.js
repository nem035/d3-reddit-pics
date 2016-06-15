function visualize({ data }) {
  const reditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const svg = d3.select('svg');

  const g = svg.append('g');

  const maxScore = d3.max(reditData, (d) => d.data.score);
  const yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([0, 500]);

  const circles = g.selectAll('circle').data(reditData);
  const circleAttrs = {
    cx(d, i) {
      return i * 15;
    },
    cy(d, i) {
      return yScale(d.data.score);
    },
    r: 6
  };
  circles.enter()
    .append('circle')
    .attr(circleAttrs);
}
