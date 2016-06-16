function visualize({ data }) {
  const reditData = data.children.sort((a, b) => a.data.score - b.data.score);

  const svg = d3.select('svg');

  const minHeight = 10;
  const maxHeight = 500;
  const minWidth = 0;
  const maxWidth = 850;

  const maxScore = d3.max(reditData, (d) => d.data.score);
  const yScale = d3.scale.linear()
    .domain([0, maxScore])
    .range([minHeight, maxHeight]);
  const xScale = d3.scale.linear()
    .domain([0, maxWidth])
    .range([minWidth, maxWidth]);

  const yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left')
    .ticks((maxHeight - minHeight) / reditData.length); // best guess
    // .tickValues([20, 30, 90]) // exact tick points
  const xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');

  const yPadding = 20;
  const xPadding = 60;

  const gY = svg.append('g')
    .attr('transform', `translate(${xPadding}, ${yPadding})`);
  const gX = svg.append('g')
    .attr('transform', `translate(${xPadding}, ${maxHeight + yPadding})`);

  yAxis(gY);
  xAxis(gX);
}
