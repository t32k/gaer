'use strict';

var request = require('request');
var chalk = require('chalk');
var ProgressBar = require('progress');
var pkg = require('../package.json');

var UA = 'GAERbot/' + pkg.version + ' (+' + pkg.homepage + ')';
var GA_URL_ENDPOINT = 'https://ssl.google-analytics.com/collect';
var GA_VERSION = 1;
var GA_CLIENT_ID = Math.round(2147483647 * Math.random());
var GA_HIT_TYPE = 'event';
var GA_EVENT_CATEGORY = 'GAER';


/**
 * Argument is file path or not
 * @param {String} Tracking ID
 * @param {String} Report name
 * @param {Object} Report data
 */
function gaer(id, action, obj) {
  var options = {
    url: GA_URL_ENDPOINT,
    headers: {'User-Agent': UA},
    form: {
      v: GA_VERSION,
      tid: id,
      cid: GA_CLIENT_ID,
      t: GA_HIT_TYPE,
      ec: GA_EVENT_CATEGORY,
      ea: action
    }
  };
  var bar = new ProgressBar('Sending [:bar] :percent', {
    complete: '|',
    incomplete: '+',
    width: 24,
    total: Object.keys(obj).length
  });
  Object.keys(obj).forEach(function (key) {
    options.form.el = key;
    options.form.ev = obj[key];
    request.post(options, function (error, response) {
        if (!error && response.statusCode == 200) {
          bar.tick();
          if (bar.complete) {
            console.log(chalk.green('Completed: The data is sent to ' + id));
          }
        } else {
          util.error(error);
        }
      }
    );
  });
}

module.exports = gaer;
