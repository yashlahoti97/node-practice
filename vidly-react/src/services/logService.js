// import Raven from 'raven-js';
function init() {
  // initial configuration for the logging service
}

function log(error) {
  // Raven.captureException(error)
  console.error(error);
}

export default {
  init,
  log,
};
