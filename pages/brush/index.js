function visualize({ data }) {
  const redditData = data.children
    .sort((a, b) => a.data.created - b.data.created)
    .map(d => {
      d.data.created *= 1000; // * 1000 because reddit dates are in seconds
      console.log(new Date(d.data.created));
      return d;
    });

  const minWidth = 10;
  const maxWidth = 850;

  const svg = d3.select('svg');
  const g = svg.append('g')
    .attr('transform', `translate(${minWidth}, 250)`);

  const domain = d3.extent(redditData, d => d.data.created);
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
    x: (d) => xScale(d.data.created),
    y: 0,
    width: 2,
    height: brushHeight
  })
  .style({fill: '#ff9100' });

  brush.on('brushend', function() {
    const [minCreated, maxCreated] = brush.extent();
    const filtered = redditData.filter(({ data }) => {
      const { created } = data;
      return created > minCreated && created < maxCreated;
    });

    g.selectAll('rect.event')
      .style({ fill: '#ff9100' }) // resets the style from previous brushend
      .data(filtered, d => d.data.id)
      .style({
        fill: '#eeff41'
      });
  });
}
