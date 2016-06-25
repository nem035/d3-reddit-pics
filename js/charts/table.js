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
      .data(data, d => d.id)
      .order();

    const dataRowsEnter = dataRows.enter()
      .append('div')
      .classed('row', true)
      .attr('id', d => d.id);

    dataRowsEnter.style('opacity', 0)
      .transition()
      .ease('quad')
      .duration(window.transitionTime)
      .style('opacity', 1);

    dataRowsEnter.append('div')
      .classed('voted', true)
      .html((d) => `
        <div class="arrow up" role="button" aria-label="upvote" tabindex="0"></div>
        <div class="score dislikes">${d.downs}</div>
        <div class="score unvoted">${d.ups}</div>
        <div class="score likes">${d.score}</div>
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
        (<a href="https://www.reddit.com/domain/${d.domain}" target="_blank">${d.domain}</a>)
      `);

    entry.append('p')
      .classed('tagline', true)
      .html((d) => `
        submitted
        <time title="${getAxisTimeFormat(d.created)}" datetime="${new Date(d.created)}" class="live-timestamp">
          ${getTimeFromNow(d.created)}
        </time>
        by
        <a href="https://www.reddit.com/user/${d.author}" target="_blank" class="author">${d.author}</a>
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

    // transition removal of excess rows
    dataRows.exit()
      .style('opacity', 0)
      .transition()
      .ease('quad')
      .remove();
  }

  chart.highlightRows = function(data) {
    const rows = table.selectAll('.row')
      .data(data, d => d.id)
      .classed('highlighted', true);
  }

  chart.unhighlightRows = function(data) {
    table.selectAll('.row')
      .data(data, d => d.id)
      .classed('highlighted', false);
  }

  chart.scrollToRow = function(data) {
    if (data.length === 1) {
      const target = table.selectAll('.row')
        .data(data, d => d.id)[0][0];

      const targetPos = findYOffset(target);

      d3.transition()
        .duration(window.transitionTime * 2)
        .ease('quad')
        .tween('scrollTop', scrollTopTween(targetPos - 33)); // 33 for some extra spacing
    }
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  };

  function findYOffset(obj) {
    let top = 0;
    while (obj.offsetParent) {
      top += obj.offsetTop;
      obj = obj.offsetParent;
    }
    return top;
  }

  function scrollTopTween(scrollTop) {
    const node = table.node();
    return function() {
      const i = d3.interpolateNumber(node.scrollTop, scrollTop);
      return function(t) {
        node.scrollTop = i(t);
      };
   };
  }

  return d3.rebind(chart, dispatch, 'on');
};
