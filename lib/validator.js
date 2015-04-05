'use strict';

var fs = require('fs');
var util = require('./util');

function Validator(id, name, data) {
  this.id = id;
  this.name = name;
  this.data = data;
}

Validator.prototype.validateId = function (id) {
  var tid = id.toUpperCase();
  if (tid === '') {
    util.log('e', '--tid option is required.');
  } else if (tid.indexOf('UA-') !== 0) {
    util.log('e', '--tid option is invalid.');
  }
  return tid;
};

Validator.prototype.validateName = function (name) {
  if (name === '') {
    util.log('e', '--report option is required.');
  }
  return name;
};

Validator.prototype.validateData = function (data) {
  var validatedData = '';
  if (util.isFile(data)) {
    var strings = fs.readFileSync(data, {
      encoding: 'utf8'
    });
    validatedData = util.parseJSON(strings);
  } else if (util.isObject(data)) {
    validatedData = util.parseJSON(data);
  } else {
    util.log('e', 'argument must be JSON');
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
