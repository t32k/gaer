'use strict';

var chalk = require('chalk');
var request = require('request');
var ProgressBar = require('progress');
var pkg = require('../package.json');
var util = require('./util');

var UA = 'GAERbot/' + pkg.version + ' (+' + pkg.homepage + ')';
var URL_ENDPOINT = 'https://ssl.google-analytics.com/collect';
var VERSION = 1;
var CLIENT_ID = Math.round(2147483647 * Math.random());
var HIT_TYPE = 'event';
var APP_NAME = pkg.name;
var APP_VERSION = pkg.version;
var APP_ID = 'me.t32k.gaer';


/**
 * Argument is file path or not
 * @param {String} Tracking ID
 * @param {String} Report name
 * @param {Object} Report data
 */
function gaer(id, action, obj) {
  var options = {
    url: URL_ENDPOINT,
    headers: {'User-Agent': UA},
    form: {
      v: VERSION,
      tid: id,
      cid: CLIENT_ID,
      aid: APP_ID,
      an: APP_NAME,
      av: APP_VERSION,
      t: HIT_TYPE,
      ec: APP_NAME,
      ea: action
    }
  };
  util.log('i', options);
  var bar = new ProgressBar('Sending [:bar] :percent', {
    complete: '|',
    incomplete: '+',
    width: 24,
    total: Object.keys(obj).length
  });
  Object.keys(obj).forEach(function (key, index) {
    options.form.el = key;
    options.form.ev = obj[key];
    util.log('i', '  '+ (index+1) +' '+ key + ': ' + obj[key]);
    request.post(options, function (error, response) {
        if (!error && response.statusCode == 200) {
          bar.tick();
          if (bar.complete) {
            var address = process.env.GA_TID ? 'GA'  : id;
            util.log('s', 'The data is sent to ' + address)
          }
        } else {
          util.error(error);
        }
      }
    );
  });
}

module.exports = gaer;
