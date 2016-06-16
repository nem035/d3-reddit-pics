function visualize({ data }) {
  const redditData = data.children
    .map(({ data }) => {
      return {
        id: data.id,
        created: data.created * 1000 // * 1000 because reddit dates are in seconds
      };
    })
    .sort((a, b) => a.created - b.created)

  const minWidth = 10;
  const maxWidth = 850;

  const svg = d3.select('svg');
  const g = svg.append('g')
    .attr('transform', `translate(${minWidth}, 250)`);

  const domain = d3.extent(redditData, d => d.created);
  const xScale = d3.time.scale()
    .domain(domain)
    .range([minWidth, maxWidth]);

  const brushHeight = 30;
  const brush = d3.svg.brush()
    .x(xScale)

  brush(g);

  g.selectAll('rect').attr('height', brushHeight)
  g.selectAll('rect.background')
    .style({fill: '#f50057', visibility: 'visible'})
  g.selectAll('rect.extent')
    .style({fill: window.fillColor, visibility: 'visible'})
  g.selectAll('.resize rect')
    .style({fill: '#00bfa5', visibility: 'visible'})

  const rects = g.selectAll('rect.event')
    .data(redditData);

  rects.enter().append('rect')
    .classed('event', true);

  rects.attr({
    x: (d) => xScale(d.created),
    y: 0,
    width: 2,
    height: brushHeight
  })
  .style({fill: '#ff9100' });

  brush.on('brushend', function() {
    const [minCreated, maxCreated] = brush.extent();
    const filtered = redditData.filter(({ created }) => {
      return created > minCreated && created < maxCreated;
    });

    const rects = g.selectAll('rect.event');

    // resets the style from previous brushend
    rects.transition()
      .duration(window.transitionTime)
      .delay((d, i) => i)
      .style({ fill: '#ff9100' });

    // update new style
    rects.data(filtered, d => d.id)
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i)
      .style({
        fill: '#eeff41'
      });
  });
}
