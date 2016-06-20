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
      container,
      sort = false
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
      .data(data);

    const dataRowsEnter = dataRows.enter()
      .append('tr')
      .classed('data-row', true);

    // build the dataRows

    // 1st column is the thumbnail linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => d.url
      })
      .append('img')
      .attr({
        src: (d) => d.thumbnail
      });

    // next column is the title linking to the post
    dataRowsEnter.append('td')
      .append('a')
      .attr({
        href: (d) => `https://reddit.com${d.permalink}`
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

  return chart;
};
