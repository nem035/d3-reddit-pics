d3.redditChart.scatter = function() {
  let g;
  let data;
  let xRange;
  let yRange;
  let circles;

  function chart(container) {
    g = container;
    g.classed('g-scatter', true);
    chart.render();
  }

  chart.render = function() {
    // clear the graph before rendering
    // g.html('');

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
      .transition()
      .ease('exp')
      .attr('r', 0);

    // existing circles animated
    circles.transition()
      .duration(window.transitionTime)
      .ease('quad')
      .delay((d, i) => i * 5)
      .attr(circleAttrs);

    addTooltip(circles);

    // old circles are removed
    circles.exit()
      .transition()
      .duration(window.transitionTime)
      .ease('exp')
      .attr('r', 0)
      .remove();
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

  function addTooltip(circles) {
    // tooltip
    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(d => (
        `
        <h4 class="title" style="text-align: center; margin: 3px;">
          ${d.title}
        </h4>
        <div class="score">
          <strong>Score:</strong> <span>${d.score}</span>
        </div>
        <div class="created">
          <strong>Created:</strong> <span>${getAxisTimeFormat(d.created)}</span>
        </div>`
      ));

    d3.select('.viz.scatter > svg').call(tip);

    circles.on('mouseover', tip.show)
    .on('mouseout', tip.hide);
  }

  return chart;
};
