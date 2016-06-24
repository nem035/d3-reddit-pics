d3.redditChart.scatter = function() {
  let g;
  let data;
  let xRange = [ 0, 600 ];
  let yRange = [ 0, 300 ];
  let circles;

  const dispatch = d3.dispatch('circleMouseOver', 'circleMouseOut');

  function chart(container) {
    g = container;
    g.classed('g-scatter', true);
    chart.render();
  }

  chart.render = function() {
    // create x scale from the data
    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time
      .scale()
      .domain(xDomain)
      .range(xRange);

    // create the y scale from the data
    const yDomain = [0, d3.max(data, d => d.score)];
    const yScale = d3.scale
      .linear()
      .domain(yDomain)
      .range(yRange);

    // create all circles (do not exist yet)
    const circles = g.selectAll('circle')
      .data(data);

    // assign them attributes
    const circleAttrs = {
      cx: (d) => xScale(d.created),
      cy: (d) => yRange[1] - yScale(d.score),
      'data-score': (d) => d.score,
      'data-created': (d) => d.created,
      r: 6,
      class: 'scatter-circle',
    };

    // new circles are created
    circles.enter()
      .append('circle')
      .attr('r', 0)
      .transition()
      .duration(window.transitionTime)
      .ease('quad')
      .attr('r', 6);

    // existing circles animated
    circles.transition()
      .duration(window.transitionTime)
      .ease('quad')
      .attr(circleAttrs);

    circles.on('mouseover', (d) => {
      chart.highlightCircles([ d ]);
      dispatch.circleMouseOver(d);
    })
    .on('mouseout', (d) => {
      chart.unhighlightCircles([ d ]);
      dispatch.circleMouseOut(d);
    });

    // old circles are removed
    circles.exit()
      .attr('r', 0)
      .transition()
      .duration(window.transitionTime * 3)
      .ease('exp')
      .remove();
  }

  chart.highlightCircles = function(data) {
    chart.unhighlightAllCircles();
    g.selectAll('circle')
      .data(data, d => d.id)
      .classed('highlighted', true);
  }

  chart.unhighlightCircles = function(data) {
    g.selectAll('circle')
      .data(data, d => d.id)
      .classed('highlighted', false);
  }

  chart.unhighlightAllCircles = function() {
    g.selectAll('circle')
      .classed('highlighted', false);
  }

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

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
};
