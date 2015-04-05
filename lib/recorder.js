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
}

Recorder.prototype.record = function () {
  this.arry.forEach(function (key, index) {
    this.options.form.el = key;
    this.options.form.ev = this.data[key];
    util.log('i', '  ' + (index + 1) + ' ' + key + ': ' + this.data[key]);
    request.post(this.options, function (error, response) {
        if (!error && response.statusCode == 200) {
          this.bar.tick();
          if (this.bar.complete) {
            var address = process.env.GA_TID ? 'GA' : id;
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
