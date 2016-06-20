window.codeScope = 'scatter';

d3.chart.scatter = function() {
  let data;

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

  function chart(config) {
    const {
      container,
      sort = false,
      radius = 6
    } = config;

    if (sort) {
      data = data.sort((a, b) => a.score - b.score);
    }

    const {
      minWidth,
      maxWidth,
      minHeight,
      maxHeight
    } = getContainerDim(container);

    const g = container.append('g')
      .attr('transform', `translate(${minHeight}, 0)`);

    const xDomain = d3.extent(data, d => d.created);
    const xScale = d3.time.scale()
      .domain(xDomain)
      .range([minWidth, maxWidth]);

    const yDomain = [0, d3.max(data, d => d.score)];
    const yScale = d3.scale.linear()
      .domain(yDomain)
      .range([minHeight, maxHeight]);

    const circles = g.selectAll('circle')
      .data(data);

    const circleAttrs = {
      cx: d => {
        return xScale(d.created);
      },
      cy: d => {
        return yScale(d.score);
      },
      r: radius
    };
    circles.enter()
      .append('circle')
      .transition()
      .duration(window.transitionTime)
      .delay((d, i) => i * 5)
      .attr('fill', window.fillColor)
      .attr(circleAttrs);
  }

  return chart;
};
