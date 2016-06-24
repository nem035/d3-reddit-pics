d3.redditChart.table = function() {
  let data;
  let table;

  const dispatch = d3.dispatch('rowMouseOver', 'rowMouseOut');

  function chart(container) {
    table = container.append('table');
    chart.render();
  }

  chart.render = function() {
    const dataRows = table.selectAll('tr.data-row')
      .data(data);

    const dataRowsEnter = dataRows.enter()
      .append('tr')
      .classed('data-row', true)
      .attr('id', d => d.id);

    dataRowsEnter.style('opacity', 0)
      .transition()
      .ease('quad')
      .duration(window.transitionTime)
      .style('opacity', 1);

    // 1st column is the thumbnail linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => d.url,
        target: '_blank',
      })
      .append('img')
      .attr('src', d => d.thumbnail);

    // next column is the title linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => `https://reddit.com${d.permalink}`,
        target: '_blank',
      })
      .text(d => d.title);

    // next column is the score
    dataRowsEnter.append('td')
      .text(d => d.score);

    // next column is the upvotes
    dataRowsEnter.append('td')
      .text(d => d.ups);

    // next column is the downvotes
    dataRowsEnter.append('td')
      .text(d => d.downs);

    // dispatch mouse events
    dataRowsEnter.on('mouseover', (d) => {
      chart.highlightRows([ d ]);
      dispatch.rowMouseOver(d);
    });
    dataRowsEnter.on('mouseout', (d) => {
      chart.unhighlightRows([ d ]);
      dispatch.rowMouseOut(d);
    });

    dataRows.exit()
      .style('opacity', 1)
      .transition()
      .ease('quad')
      .duration(window.transitionTime)
      .style('opacity', 0)
      .remove();
  }

  chart.highlightRows = function(data) {
    table.selectAll('tr.data-row')
      .data(data, d => d.id)
      .classed('highlighted', true);
  }

  chart.unhighlightRows = function(data) {
    table.selectAll('tr.data-row')
      .data(data, d => d.id)
      .classed('highlighted', false);
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  };

  return d3.rebind(chart, dispatch, 'on');
};
