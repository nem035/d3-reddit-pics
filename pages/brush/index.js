function visualize({ data }) {
  const redditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const minWidth = 10;
  const maxWidth = 850;

  const svg = d3.select('svg');
  const g = svg.append('g')
    .attr('transform', `translate(${minWidth}, 250)`);

  const [minScore, maxScore] = d3.extent(redditData, d => d.data.score);
  const xScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minWidth, maxWidth]);

  const brushHeight = 30;
  const brush = d3.svg.brush()
    .x(xScale)
    .extent([minScore, maxScore]);

  brush(g);

  g.selectAll('rect').attr('height', brushHeight)
  g.selectAll('.background')
    .style({fill: '#78C5C5', visibility: 'visible'})
  g.selectAll('.extent')
    .style({fill: window.fillColor, visibility: 'visible'})
  g.selectAll('.resize rect')
    .style({fill: '#276C86', visibility: 'visible'})
}
