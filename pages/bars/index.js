window.codeScope = 'Bars';
window.Bars = {
  visualize({ data }) {
    const redditScores = data.children
    .map(d => d.data.score)
    .sort((a, b) => a - b);

    const svg = d3.select('svg');

    const minHeight = 10;
    const maxHeight = 450;
    const g = svg.append('g')
      .attr('transform', `translate(${minHeight}, 100)`);

    const maxScore = d3.max(redditScores);

    const yScale = d3.scale.linear()
      .domain([0, maxScore])
      .range([minHeight, maxHeight]);

    const xScale = d3.scale.ordinal()
      .domain(d3.range(redditScores.length))
      .rangeBands([0, maxHeight], 0.5)

    const bars = g.selectAll('rect').data(redditScores);
    const rectAttrs = {
      x: (score, i) => xScale(i),
      y: (score, i) => maxHeight - yScale(score),
      width: xScale.rangeBand(),
      height: yScale
    };
    bars.enter()
      .append('rect')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.fillColor)
      .attr(rectAttrs);
  }
};
