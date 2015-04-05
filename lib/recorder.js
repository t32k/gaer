'use strict';

var util = require('./util');
var request = require('request');
var ProgressBar = require('progress');


/**
 * Argument is file path or not
 * @param {String} Tracking ID
 * @param {String} Report name
 * @param {Object} Report data
 */

function Recorder(options, obj) {
  this.options = options;
  this.options.form.ea = obj.name;
  this.id = obj.id;
  this.data = obj.data;
  this.arry = Object.keys(obj.data);
  this.bar = new ProgressBar('Sending [:bar] :percent', {
    complete: '|',
    incomplete: '+',
    width: 24,
    total: this.arry.length
  });
  util.log('i', this.options);
  util.log('i', '-------------------------------');
}

Recorder.prototype.record = function () {
  var that = this;
  this.arry.forEach(function (key, index) {
    that.options.form.el = key;
    that.options.form.ev = that.data[key];

    util.log('i', '  ' + (index + 1) + ' ' + key + ': ' + that.data[key]);
    request.post(that.options, function (error, response) {
        if (!error && response.statusCode == 200) {
          that.bar.tick();
          if (that.bar.complete) {
            var address = process.env.GA_TID ? 'GA' : that.id;
            util.log('s', 'The data is sent to ' + address)
          }
        } else {
          util.error(error);
        }
      }
    );
  });
};

module.exports = Recorder;
