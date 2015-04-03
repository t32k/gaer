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
function error(message) {
  console.log(chalk.red('  Error:', message));
  process.exit();
}

module.exports = {
  isFile: isFile,
  error: error
};