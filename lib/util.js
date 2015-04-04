var fs = require('fs');
var chalk = require('chalk');

/**
 * Argument is file path or not
 * @param {String} file
 * @returns {Boolean}
 */
function isFile(file) {
  try {
    return fs.existsSync(file) && fs.statSync(file).isFile();
  } catch (error) {
    return false;
  }
}
/**
 * Colorful log
 * @param {String} log mode(color)
 * @param {String} log message
 */
function log(mode, message) {
  switch (mode) {
    case 'i':
      if(process.env.DEBUG) {
        console.log(message);
      }
      break;
    case 's':
      console.log(chalk.green('Success:',message));
      break;
    case 'e':
      console.log(chalk.red('Error:', message));
      process.exit(1);
      break;
    default:
      console.log(mode);
      break;
  }
}
/**
 * Parse JSON and check data
 * @param {String} JSON strings
 * @returns {Object}
 */
function parseJSON(strings) {
  var data;
  try {
    data = JSON.parse(strings);
  } catch (error) {
    throw errorLog(error);
  }
  // Check if value is numeric.
  Object.keys(data).forEach(function (key) {
    if (isNaN(data[key])) {
      errorLog('`value` must be numeric.');
    }
  });
  return data;
}

module.exports = {
  isFile: isFile,
  log: log,
  parseJSON: parseJSON
};
