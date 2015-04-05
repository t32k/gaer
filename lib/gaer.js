'use strict';

var pkg = require('../package.json');
var Recorder = require('./recorder ');
var Validator = require('./validator');

var UA = 'GAERbot/' + pkg.version + ' (+' + pkg.homepage + ')';
var ENDPOINT = 'https://ssl.google-analytics.com/collect';
var VERSION = 1;
var CLIENT_ID = Math.round(2147483647 * Math.random());
var HIT_TYPE = 'event';
var APP_ID = 'me.t32k.gaer';
var APP_NAME = pkg.name.toUpperCase();
var APP_VERSION = pkg.version;

function Gaer(id) {
  this.id = id;
  this.options = {
    url: ENDPOINT,
    headers: {'User-Agent': UA},
    form: {
      v: VERSION,
      tid: id,
      cid: CLIENT_ID,
      aid: APP_ID,
      an: APP_NAME,
      av: APP_VERSION,
      t: HIT_TYPE,
      ec: APP_NAME
    }
  }
}

Gaer.prototype.record = function(name, data){
  var args = new Validator(this.id, name, data).validate();
  new Recorder(this.options, args).record();
};

module.exports = Gaer;
