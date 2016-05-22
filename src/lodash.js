const fp = require('lodash/fp');

// Lodash fp caps arguments to only the first argument

// Every option is `true` by default.
module.exports = fp.convert({
  // Specify capping iteratee arguments.
  cap: false,
});
