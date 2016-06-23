d3.redditChart.brush = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];

  function chart(container) {
    g = container;

    g.classed('g-brush', true);

    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const brush = d3.svg
      .brush()
      .x(xScale)

    brush(g);

    const rects = g.selectAll('rect.no-event')
      .data(data);

    rects.enter()
      .append('rect')
      .classed('data no-event', true);

    rects.attr({
      x: ({ created }) => xScale(created),
      y: 0,
      'data-score': (d) => d.score,
      'data-created': (d) => d.created,
    })
    .classed('brushed', false);

    brush.on('brush', function() {
      const [ minCreated, maxCreated ] = brush.extent();
      const filtered = data.filter(({ created }) => (
        created > minCreated && created < maxCreated
      ));

      const rects = g.selectAll('rect.no-event');

      // resets the style from previous brushing
      rects.classed('brushed', false);

      // update new style
      rects.data(filtered, d => d.id)
        .classed('brushed', true);
    });

    rects.exit().remove();
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  }

  chart.xRange = function(val) {
    if (!arguments.length) {
      return xRange;
    }
    xRange = val;
    return chart;
  }

  return chart;
};
