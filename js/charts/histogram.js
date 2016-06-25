window.redditChart.histogram = function() {
  let g;
  let data;
  let width;
  let height;
  let cx = 10;
  let numberBins = 5;
  let dispatch = d3.dispatch(chart, 'histMouseOver', 'histMouseOut');

  function chart(container) {
    g = container;
    container.classed('g-histogram', true);
    chart.render();
  }

  chart.render() {
    const hist = d3.layout
      .histogram()
      .value(d => d.score)
      .range([ 0, d3.max(data, d => d.score  ])
      .bins(numberBins);

    const layout = hist(data);

    const maxLength = d3.max(layout, d => d.length);
    const widthScale = d3.scale
      .linear()
      .domain([ 0, maxLength ])
      .range([ 0, width ])

    const yScale = d3.scale
      .ordinal()
      .domain(d3.range(numberBins))
      .rangeBands([ height, 0 ], 0.1);

    const colorScale = d3.scale.category20();

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
      dispatch.histMouseOut([]);
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
}
