window.codeScope = 'brush';

d3.chart.brush = function() {
  let data;

  function chart(config) {
    const {
      container,
      brushHeight = 30,
    } = config;

    const {
      minWidth,
      maxWidth,
      containerHeight,
      containerPadding,
    } = getContainerDim(container);

    const halfHeight = containerHeight / 2;
    const brushHalfHeight = brushHeight / 2;

    const g = container.append('svg')
      .append('g')
      .attr('transform', `translate(${containerPadding}, ${halfHeight - brushHalfHeight})`);

    const xDomain = d3.extent(data, d => d.created);
    const xRange = [ minWidth, maxWidth ];
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const brush = d3.svg
      .brush()
      .x(xScale)

    brush(g);

    g.selectAll('rect')
      .attr('height', brushHeight);

    g.selectAll('rect.background')
      .style({
        fill: '#f50057',
        visibility: 'visible',
      });

    g.selectAll('rect.extent')
      .style({
        fill: window.fillColor,
        visibility: 'visible'
      });

    g.selectAll('.resize rect')
      .style({
        fill: '#00bfa5',
        visibility: 'visible',
      });

    const rects = g.selectAll('rect.event')
      .data(data);

    rects.enter()
      .append('rect')
      .classed('no-event', true);

    rects.attr({
      x: ({ created }) => xScale(created),
      y: 0,
      width: 2,
      height: brushHeight
    }).style({
      fill: '#ff9100',
    });

    brush.on('brush', function() {
      const [ minCreated, maxCreated ] = brush.extent();
      const filtered = data.filter(({ created }) => (
        created > minCreated && created < maxCreated
      ));

      const rects = g.selectAll('rect.no-event');

      // resets the style from previous brushend
      rects.transition()
        .duration(window.transitionTime / 3)
        .style({
          fill: '#ff9100'
        });

      // update new style
      rects.data(filtered, d => d.id)
        .transition()
        .duration(window.transitionTime / 3)
        .style({
          fill: '#eeff41'
        });
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

  return chart;
};
