'use strict';

var util = require('./util');

function Validator(id, name, data) {
  this.id = id;
  this.name = name;
  this.data = data;
}

Validator.prototype.validateId = function(id){
  var tid = id.toUpperCase();
  if (tid === '') {
    util.log('e', '--tid option is required.');
  } else if (gaTrackingId.indexOf('UA-') !== 0) {
    util.log('e', '--tid option is invalid.');
  }
};

Validator.prototype.validateName = function(name){
  if (name === '') {
    util.log('e', '--report option is required.');
  }
};

Validator.prototype.validateData = function(data){
  if (util.isFile(data)) {
    var strings = fs.readFileSync(data, {
      encoding: 'utf8'
    });
    util.parseJSON(strings);
  } else {
    util.log('e', 'argument must be JSON file');
  }
};
Validator.prototype.validate = function(){
  this.validateId(this.id);
  this.validateName(this.name);
  this.validateData(this.data);
};
