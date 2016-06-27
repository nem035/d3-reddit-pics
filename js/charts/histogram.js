window.redditChart.histogram = function() {
  let g;
  let data;
  let xRange;
  let yRange;
  let cx = 10;
  let numberBins = 5;

  const dispatch = d3.dispatch(chart, 'histMouseOver', 'histMouseOut');

  function chart(container) {
    g = container;
    g.classed('g-histogram', true);
    chart.render();
  }

  chart.render = function() {
    const hist = d3.layout
      .histogram()
      .value(d => d.score)
      .range([ 0, d3.max(data, d => d.score) ])
      .bins(numberBins);

    const layout = hist(data);

    const maxLength = d3.max(layout, d => d.length);
    const widthScale = d3.scale
      .linear()
      .domain([ 0, maxLength ])
      .range(xRange)

    const yScale = d3.scale
      .ordinal()
      .domain(d3.range(numberBins))
      .rangeBands([ yRange[1], yRange[0] ], 0.1);

    const colorScale = d3.scale
      .category20();

    const rects = g.selectAll('rect')
      .data(layout)

    rects.enter()
      .append('rect');

    rects
      .transition()
      .attr({
        y: (d, i) => yScale(i),
        x: 50,
        height: yScale.rangeBand(),
        width: (d,i) => widthScale(d.length),
        fill: (d, i) => colorScale(i),
      });

    rects.exit()
      .transition()
      .remove();

    rects.on('mouseover', function(d) {
        d3.select(this).style('fill', 'orange')
        dispatch.histMouseOver(d);
      });
    rects.on('mouseout', function(d) {
      d3.select(this).style('fill', '')
      dispatch.histMouseOut(d);
    })

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

  chart.yRange = function(val) {
    if (!arguments.length) {
      return yRange;
    }
    yRange = val;
    return chart;
  }

  return d3.rebind(chart, dispatch, 'on');
}
