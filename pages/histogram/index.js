function visualize({ data }) {
  const redditScores = data.children
    .map(d => d.data.score)
    .sort((a, b) => a - b);

  const svg = d3.select('svg');

  const minHeight = 50;
  const maxHeight = 450;
  const g = svg.append('g')
    .attr('transform', `translate(${minHeight}, 0)`);

  const maxScore = d3.max(redditScores);
  const hist = d3.layout.histogram()
    .value(d => d)
  .range([0, maxScore])
  .bins(10); // number of histogram bins

  const layout = hist(redditScores);
  svg.selectAll('rect')
    .data(layout)
    .enter().append('rect')
    .transition()
    .duration(window.transitionTime)
    .attr({
      x: (scoreBin, idx) => 150 + idx * 30,
      y: 150,
      width: 20,
      height: (scoreBin, idx) => 20 * scoreBin.length,
      fill: window.fillColor
    });
}
