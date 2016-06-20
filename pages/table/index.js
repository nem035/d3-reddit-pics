window.codeScope = 'table';

d3.chart.table = function() {
  let data;

  chart.data = function(val) {
    if (!arguments.length) return data;
    data = val;
    return chart;
  };

  function chart(config) {
    const {
      container
    } = config;

    const redditData = data.children
      .sort((a, b) => b.data.score - a.data.score);

    const table = container.append('table');
    const tHead = table.append('thead');
    const tBody = table.append('tbody');

    const titleRow = tHead.append('tr')
      .classed('title-row', true);

    titleRow.append('td')
      .text('Thumbnail');
    titleRow.append('td')
      .text('Title');
    titleRow.append('td')
      .text('Score');
    titleRow.append('td')
      .text('Upvotes');
    titleRow.append('td')
      .text('Downvotes');

    const dataRows = tBody.selectAll('tr.data-row')
      .data(redditData);

    const dataRowsEnter = dataRows.enter()
      .append('tr')
      .classed('data-row', true);

    dataRowsEnter.style('opacity', 0.0)
      .transition()
      .delay((d, idx) => idx * 50)
      .duration(window.transitionTime)
      .style('opacity', 1.0);

    // build the dataRows

    // 1st column is the thumbnail linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => d.data.url
      })
      .append('img')
      .attr({
        src: (d) => d.data.thumbnail
      });

    // next column is the title linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => `https://reddit.com${d.data.permalink}`
      })
      .text(d => d.data.title);

    // next column is the score
    dataRowsEnter.append('td')
      .text(d => d.data.score);

    // next column is the upvotes
    dataRowsEnter.append('td')
      .text(d => d.data.ups);

    // next column is the downvotes
    dataRowsEnter.append('td')
      .text(d => d.data.downs);

    dataRows.exit().remove();
  }

  return chart;
};
