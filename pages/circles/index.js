window.codeScope = 'Circles';
window.Circles = {
  visualize({ data }) {
    const redditData = data.children
      .map(d => d.data.score)
      .sort((a, b) => a - b);

    const svg = d3.select('svg');

    const minHeight = 50;
    const maxHeight = 450;
    const g = svg.append('g')
      .attr('transform', `translate(${minHeight}, 0)`);

    const maxScore = d3.max(redditData);
    const yScale = d3.scale.linear()
      .domain([0, maxScore])
      .range([minHeight, maxHeight]);

    const circles = g.selectAll('circle').data(redditData);
    const circleAttrs = {
      cx: (score, i) => i * 15,
      cy: yScale,
      r: 6
    };
    circles.enter()
      .append('circle')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.fillColor)
      .attr(circleAttrs);
  }
};
