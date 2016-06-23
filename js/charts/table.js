d3.redditChart.table = function() {
  let c;
  let data;

  function chart(container) {
    c = container;

    const table = container.append('table');
    const tHead = table.append('thead');
    const tBody = table.append('tbody');

    const titleRow = tHead.append('tr');

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
      .data(data);

    const dataRowsEnter = dataRows.enter()
      .append('tr')
      .classed('data-row', true);

    // build the dataRows

    // 1st column is the thumbnail linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => d.url,
        target: '_blank',
      })
      .append('img')
      .attr({
        src: (d) => d.thumbnail
      });

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

    dataRows.exit().remove();
  }

  chart.data = function(val) {
    if (!arguments.length) {
      return data;
    }
    data = val;
    return chart;
  };

  return chart;
};
