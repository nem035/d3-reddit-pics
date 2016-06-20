window.codeScope = 'scatter';

d3.chart.scatter = function() {
  let data;

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

  function chart(config) {
    const {
      container
    } = config;

    const redditData = data.children
      .map(d => d.data.score)
      .sort((a, b) => a - b);

    const containerHeight = parseInt(container.style('height'));
    const minHeight = containerHeight / 12;
    const maxHeight = containerHeight - minHeight;
    
    const g = container.append('g')
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

  return chart;
};
