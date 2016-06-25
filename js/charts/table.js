window.redditChart.table = function() {
  let data;
  let table;

  const dispatch = d3.dispatch('rowMouseOver', 'rowMouseOut');

  function chart(container) {
    table = container.append('div')
      .classed('table', true);
    chart.render();
  }

  chart.render = function() {
    const dataRows = table.selectAll('.row')
      .data(data);

    const dataRowsEnter = dataRows.enter()
      .append('div')
      .classed('row', true)
      .attr('id', d => d.id);

    dataRowsEnter.style('opacity', 0)
      .transition()
      .ease('quad')
      .duration(window.transitionTime)
      .style('opacity', 1);

    dataRowsEnter.append('span')
      .classed('rank', true)
      .text('1');

    dataRowsEnter.append('div')
      .classed('voted', true)
      .html((d) => `
        <div class="arrow up" role="button" aria-label="upvote" tabindex="0"></div>
        <div class="score dislikes">78</div>
        <div class="score unvoted">79</div>
        <div class="score likes">80</div>
        <div class="arrow down" role="button" aria-label="downvote" tabindex="0"></div>
      `);

    dataRowsEnter.append('a')
      .classed('thumbnail', true)
      .attr({
        href: (d) => d.thumbnail,
        target: '_blank',
      })
      .append('img')
      .attr({
        src: (d) => d.thumbnail,
        width: 70,
        height: 70
      });

    const entry = dataRowsEnter.append('div')
      .classed('entry', true);

    entry.append('p')
      .classed('title', true)
      .append('a')
      .classed('title', true)
      .attr({
        href: (d) => `https://reddit.com${d.permalink}`,
        target: '_blank',
        tab_index: 1
      })
      .text(d => d.title)
      .append('span')
      .classed('domain', true)
      .html((d) => `
        (<a href="${d.thumbnail}">i.imgur.com</a>)
      `);

    entry.append('p')
      .classed('tagline', true)
      .html((d) => `
        submitted
        <time title="${d.created}" datetime="${new Date(d.created)}" class="live-timestamp">
          ${timeFormat(new Date(d.created))}
        </time>
        by
        <a href="user goes here" class="author">USER</a>
      `);

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
    table.selectAll('.row')
      .data(data, d => d.id)
      .classed('highlighted', true);
  }

  chart.unhighlightRows = function(data) {
    table.selectAll('.row')
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
