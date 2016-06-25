window.transitionTime = 300;
window.vizNames = ['bar', 'line', 'scatter'];
window.brushHeight = 30;
window.xAxisSpacing = 35;
window.yAxisSpacing = 20;
window.yAxisTextHeight = 45;
window.redditChart = {};

function init() {
  window.timeFormat = d3.time.format('%a %d %I:%M %p');
}

function initValues(data) {
  const [ furthestPostDate, nearestPostDate ] = d3.extent(data, d => d.created);
  const [ minPostScore, maxPostScore ] = d3.extent(data, d => d.score);

  window.furthestPostDate = furthestPostDate;
  window.nearestPostDate = nearestPostDate;
  window.minPostScore = minPostScore;
  window.maxPostScore = maxPostScore;
}

function getContainerDim(container) {
  const ref = (() => {
    while (!container.style) {
      container = container.parentElement;
    }
    return container;
  })();

  const {
    xAxisSpacing,
    yAxisSpacing
  } = window;

  const height = parseInt(ref.style('height'));
  const width = parseInt(ref.style('width'));

  const xRange = [ xAxisSpacing, width - 50 ];
  const yRange = [ 0, height - yAxisSpacing - 70 ];

  return {
    width,
    height,
    xRange,
    yRange,
  };
}

function startAlienRotation() {
  const alien = document.querySelector('.alien');
  if (alien) {
    if (alien.className.indexOf('rotating') === -1) {
      alien.className += ' rotating';
    }
  }
}

function createLoadingNode() {
  const loadingNode = document.createElement('span');
  loadingNode.className += ' loading';

  loadingNode.appendChild(document.createTextNode('Loading'));

  document.body
    .appendChild(loadingNode);
}

function setLoading() {
  document.body.className += ' loading';
  startAlienRotation();
  createLoadingNode();
}

function stopAlienRotation() {
  const alien = document.querySelector('.alien');
  if (alien) {
    alien.className = alien.className
    .replace(' rotating', '');
  }
}

function removeLoadingNode() {
  const loadingNode = document.querySelector('.loading-box');
  if (loadingNode) {
    loadingNode.remove();
  }
}

function resetLoading() {
  stopAlienRotation();
  removeLoadingNode();
  document.body.className = document.body.className.replace(' loading', '');
}

function createErrorBox(error) {
  const message = error.responseText || error.message || 'Something went wrong. Probably good old CORS. Try Refreshing the page.';

  // create error node
  const errorBox = document.createElement('div');
  errorBox.className += ' error-box';

  // create error message node
  const errorMessage = document.createElement('span');
  errorMessage.className += ' error-message';

  // add error message text
  errorMessage.appendChild(document.createTextNode(message))

  // add error mesage node to the error node
  errorBox.appendChild(errorMessage);

  // prepend error node to body
  document.body.insertBefore(errorBox, document.body.firstChild);
}

function destroyErrorBox() {
  const errorBox = document.querySelector('.error-box');
  if (errorBox) {
    errorBox.remove();
  }
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

  return hash.slice(1)
      .split(',')
      .filter(x => vizNames.indexOf(x) !== -1);
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
  const baseURL = hostname === 'localhost' ?
    origin :
    'https://nem035.github.io/d3-reddit-pics';

  return data.children
    .filter(({ data }) => data.thumbnail !== 'self')
    .map(({ data }) => {

      // clean up time to only contain propr UTC
      data.created = data.created_utc * 1000; // * 1000 because create_utc is in seconds
      delete data.created_utc;

      // clean thumbnail
      if (data.thumbnail.indexOf('://') === -1) {
        data.thumbnail = `${baseURL}/img/placeholder-140x140.png`;
      }
      return data;
    })
    .sort((a, b) => b.created - a.created);
}

function getAxisTimeFormat(ms) {
  return window.timeFormat(new Date(ms));
}

function getTimeFromNow(ms) {
  const end = new Date(ms);
  const start = new Date();
  const daysPassed = d3.time.days(end, start, 1).length - 1;
  const hoursPassed = d3.time.hours(end, start, 1).length - 1;
  const minutesPassed = d3.time.minutes(end, start, 1).length - 1;
  const secondsPassed = d3.time.seconds(end, start, 1).length - 1;

  let unit;
  let val;

  // determine days, hours, mins or seconds
  if (daysPassed > 0) {
    val = daysPassed;
    unit = 'day';
  } else if (hoursPassed > 0) {
    val = hoursPassed;
    unit = 'hour';
  } else if (minutesPassed > 0) {
    val = minutesPassed;
    unit = 'minute';
  } else {
    val = secondsPassed;
    unit = 'second';
  }

  // pluralize
  if (val !== 1) {
    unit = `${unit}s`;
  }

  return `${val} ${unit} ago`;
}
