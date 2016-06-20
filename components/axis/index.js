window.codeScope = 'Axis';
window.Axis = {
  visualize({ data }) {
    const redditScores = data.children
      .map(d => d.data.score)
      .sort((a, b) => a - b);

    const svg = d3.select('svg');

    const minHeight = 10;
    const maxHeight = 500;
    const minWidth = 0;
    const maxWidth = 850;

    const maxScore = d3.max(redditScores);
    const yScale = d3.scale.linear()
      .domain([0, maxScore])
      .range([maxHeight, minHeight]);
    const xScale = d3.scale.linear()
      .domain([0, maxWidth])
      .range([minWidth, maxWidth]);

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks((maxHeight - minHeight) / redditScores.length); // best guess
      // .tickValues([20, 30, 90]) // exact tick points
    const xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom');

    const yPadding = 20;
    const xPadding = 60;

    const gY = svg.append('g')
      .attr('transform', `translate(${xPadding}, ${yPadding})`)
      .transition()
      .duration(window.transitionTime)
      .style({ fill: 'none', 'stroke': window.fillColor });
    const gX = svg.append('g')
      .attr('transform', `translate(${xPadding + 2}, ${maxHeight + yPadding})`)
      .style({ fill: 'none', 'stroke': '#b0bec5' });

    yAxis(gY);
    xAxis(gX);
  }
};
