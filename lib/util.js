'use strict';

var fs = require('fs');
var chalk = require('chalk');

/**
 * Argument is file path or not
 * @param {String} file
 * @return {Boolean}
 */
function isFile(file) {
  try {
    return fs.existsSync(file) && fs.statSync(file).isFile();
  } catch (error) {
    return false;
  }
}

/**
 * Parse and return JSON
 * @param {String} JSON strings
 * @return {Object}
 */
function parseJSON(strings) {
  var data;
  try {
    data = JSON.parse(strings);
  } catch (error) {
    throw log('e', error);
  }
  return data;
}

/**
 * Colorful log
 * @param {String} log mode(color)
 * @param {String} log message
 */
function log(mode, message) {
  switch (mode) {
    case 's':
      console.log(chalk.green('Success:', message));
      break;
    case 'e':
      console.log(chalk.red('Error:', message));
      process.exit(1);
      break;
    case 'i':
      if (process.env.DEBUG) {
        console.log(message);
      }
      break;
    default:
      console.log(mode);
      break;
  }
}

module.exports = {
  isFile: isFile,
  parseJSON: parseJSON,
  log: log
};
