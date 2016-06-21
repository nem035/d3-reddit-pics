d3.redditChart.brush = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let width = 600;
  let height = 30;

  function chart(container) {
    g = container;

    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    const brush = d3.svg
      .brush()
      .x(xScale)

    brush(g);

    g.selectAll('rect')
      .attr('height', height);

    g.selectAll('rect.background')
      .style({
        fill: window.color.pink,
        visibility: 'visible',
      });

    g.selectAll('rect.extent')
      .style({
        fill: window.color.green,
        visibility: 'visible'
      });

    g.selectAll('.resize rect')
      .style({
        fill: window.color.yellow,
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
      width,
      height
    }).style({
      fill: window.color.orange,
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
          fill: window.color.orange
        });

      // update new style
      rects.data(filtered, d => d.id)
        .transition()
        .duration(window.transitionTime / 3)
        .style({
          fill: window.color.teal
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

  chart.width = function(val) {
    if (!arguments.length) {
      return width;
    }
    width = val;
    return chart;
  }

  chart.height = function(val) {
    if (!arguments.length) {
      return height;
    }
    height = val;
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

function loadExample(data) {

  const container = d3.select('.viz-container')
    .append(`svg`);

  const {
    minWidth,
    maxWidth
  } = getContainerDim(container);

  const chart = d3.redditChart
    .brush()
    .data(data)
    .xRange([ minWidth, maxWidth ])
    .width(5)
    .height(30);

  chart(container);
}
