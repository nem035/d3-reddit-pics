window.transitionTime = 300;
window.vizNames = ['axis', 'bar', 'brush', 'line', 'scatter', 'table'];

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
  const axisXSpacing = 35;
  const axisYSpacing = 20;

  const height = parseInt(ref.style('height'));
  const width = parseInt(ref.style('width'));

  const xRange = [ padding + axisXSpacing, width - padding ];
  const yRange = [ padding + axisYSpacing, height - axisYSpacing - padding ];

  return {
    padding,
    axisXSpacing,
    axisYSpacing,
    width,
    height,
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
    .classed('rotating', true)

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

function getVizNamesFromHash() {
  const {
    vizNames,
    location: {
      hash
    }
  } = window;

  return hash.length > 1 ?
    hash.slice(1)
      .split(',')
      .filter(x => vizNames.indexOf(x) !== -1) :
    vizNames;
}

function setupCheckboxes() {
  const checkboxes = d3.selectAll('input[type=checkbox]');
  const rawCheckBoxes = checkboxes[0];
  const vizNames = getVizNamesFromHash();

  // setup checked attribute from the gives visualizations
  rawCheckBoxes.forEach(c => {
    c.checked = vizNames.indexOf(c.name) !== -1 ? true : false;
  });

  checkboxes.on('change', () => {
    const vizNames = rawCheckBoxes.filter(c => c.checked)
      .map(c => c.name);
    window.location.hash = `#${vizNames}`;
    updateAndVisualize();
  });
}

function cleanData({ data }) {
  // extract data props
  // add placeholder thumbnails when missing
  // convert dates because reddit uses seconds
  const {
    hostname,
    origin,
  } = window.location;

  // fix missing thumbnails
  const baseURL = hostname === 'localhost' ? origin : 'https://nem035.github.io/d3-reddit-pics';
  return data.children
    .map(({ data }) => {
      data.created = data.created * 1000;
      if (data.thumbnail.indexOf('://') === -1) {
        data.thumbnail = `${baseURL}/img/placeholder-140x140.png`;
      }
      return data;
    })
    .sort((a, b) => a.created - b.created);
}
