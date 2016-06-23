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
    g.html('');

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
    };

    circles.enter()
      .append('circle')
      .classed('scatter-circle', true)
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr(circleAttrs);

    // tooltip
    const tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(d => (
        `<div class="score">
          <strong>Score:</strong> <span>${d.score}</span>
        </div>
        <div class="created">
          <strong>Created:</strong> <span>${getAxisTimeFormat(d.created)}</span>
        </div>`
      ));

    d3.select('.viz.scatter > svg').call(tip);

    circles.on('mouseover', function() {
      console.log(this);
      tip.show.apply(this, arguments);
    })
    .on('mouseout', tip.hide);

    circles.exit().remove();
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

  return chart;
};
