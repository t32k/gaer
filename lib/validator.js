'use strict';

var fs = require('fs');
var util = require('./util');

/**
 * Validator class
 * @param {String} GA Tracking ID
 * @param {String} GA report name
 * @param {String|Object} JSON data
 * @constructor
 */
function Validator(id, name, data) {
  this.id = id;
  this.name = name;
  this.data = data;
}

/**
 * Validate tracking ID
 * @param {String} GA Tracking ID
 * @return {String}
 */
Validator.prototype.validateId = function (id) {
  var tid = id.toUpperCase();
  if (tid === '') {
    util.log('e', '--tid option is required.');
  } else if (tid.indexOf('UA-') !== 0) {
    util.log('e', '--tid option is invalid.');
  }
  return tid;
};

/**
 * Validate report name
 * @param {String} GA report name
 * @return {String}
 */
Validator.prototype.validateName = function (name) {
  if (name === '') {
    util.log('e', '--report option is required.');
  }
  return name;
};

/**
 * Validate JSON data
 * @param {String|Object} JSON data
 * @return {Object}
 */
Validator.prototype.validateData = function (data) {
  var validatedData = '';
  if (util.isFile(data)) {
    var obj = fs.readFileSync(data, {
      encoding: 'utf8'
    });
    validatedData = util.parseJSON(obj);
  } else {
    validatedData = util.parseJSON(data);
  }
  // Check if value is numeric.
  Object.keys(validatedData).forEach(function (key) {
    if (isNaN(validatedData[key])) {
      util.log('e', '`value` must be numeric.');
    }
  });
  return validatedData;
};
Validator.prototype.validate = function () {
  var id = this.validateId(this.id);
  var name = this.validateName(this.name);
  var data = this.validateData(this.data);
  return {
    id: id,
    name: name,
    data: data
  };
};

module.exports = Validator;
