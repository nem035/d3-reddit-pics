window.transitionTime = 300;

if (!d3.redditChart) {
  d3.redditChart = {};
}

function getContainerDim(container) {
  const ref = (() => {
    while (!container.style) {
      container = container.parentElement;
    }
    return container;
  })();

  const padding = 10;
  const axisXSpacing = 50;
  const axisYSpacing = 30;

  const height = parseInt(ref.style('height'));
  const minHeight = height / padding;
  const maxHeight = height - minHeight;

  const width = parseInt(ref.style('width'));
  const minWidth = width / padding;
  const maxWidth = width - minWidth;

  const xRange = [ axisXSpacing, width - padding ];
  const yRange = [ padding, height - axisYSpacing ];

  return {
    padding,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
    xRange,
    yRange,
  };
}

function animateElemCreation(elem) {
  elem.style('opacity', 0)
    .transition()
    .duration(window.transitionTime)
    .style('opacity', 1);
}

function animateElemDestruction(elem) {
  elem.style('opacity', 1)
    .transition()
    .duration(window.transitionTime)
    .style('opacity', 0)
    .remove();
}

function setLoading() {
  // add reddit alien rotation
  d3.select('.alien')
    .classed('rotating', false)

  // create the loading span
  d3.select('.viz-container')
    .append('span')
    .classed('loading', true)
    .text('Loading');
}

function resetLoading() {
  // remove reddit alien rotation
  d3.select('.alien')
    .classed('rotating', false)

  // remove the loading span
  d3.select('.loading')
    .remove();

}

function createErrorBox(error) {
  const message = error.responseText || error.message || 'Uknown Error';

  const errorBox = d3.select('body')
    .insert('div', ':first-child')
    .classed('error-box', true);

  animateElemCreation(errorBox);

  errorBox.append('error-message')
    .text(message);
}

function destroyErrorBox() {
  animateElemDestruction(d3.select('.error-box'));
}

function clearContent() {
  d3.selectAll('.viz-container > *').remove();
}
