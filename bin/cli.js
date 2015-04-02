#!/usr/bin/env node

'use strict';

var fs = require('fs');
var _ = require('underscore');
var chalk = require('chalk');
var request = require('request');
var program = require('commander');
var ProgressBar = require('progress');

var pkg = require('../package.json');
var util = require('../lib/util');

var UA = 'GAERbot/' + pkg.version + ' (+' + pkg.homepage + ')';
var GA_URL_ENDPOINT = 'https://ssl.google-analytics.com/collect';
var GA_VERSION = 1;
var GA_CLIENT_ID = Math.round(2147483647 * Math.random());
var GA_HIT_TYPE = 'event';
var GA_EVENT_CATEGORY = 'GAER';

program
  .version(pkg.version)
  .usage('[options] <JSON>')
  .option('-t, --tid [ID]', 'set your Google Analitics tracking ID')
  .option('-a, --action [Name]', 'set your Action report name')
  .option('-s, --stdin', 'Input JSON using stdin')
  .parse(process.argv);

if (!program.args.length) {
  util.error('No input file specified.');
}


// Google Analytics Tracking ID (EX: 'UA-12345-6')
var gaTrackingId = process.env.GA_TID || program.tid || '';
gaTrackingId = gaTrackingId.toUpperCase();
if (gaTrackingId === '') {
  util.error('`tid` option is required.');
} else if (gaTrackingId.indexOf('UA-') !== 0) {
  util.error('`tid` option is invalid.');
}


// GA Event Action Name
if (!program.action){
  util.error('`action` option is required.');
}
var gaEventAction = program.action;


// GA data
var jsonData = '';

if (util.isFile(program.args[0])) {
  var jsonString = fs.readFileSync(program.args[0], {
    encoding: 'utf8'
  });
  try {
    jsonData = JSON.parse(jsonString);
  } catch (e) {
    throw e;
  }
} else {
  util.error('argument must be JSON');
}

var bar = new ProgressBar('Sending [:bar] :percent', {
  complete: '|',
  incomplete: '+',
  width: 24,
  total: _.size(jsonData)
});

Object.keys(jsonData).forEach(function(key, value){
  if(isNaN(value)) {
    util.error('`value` must be numeric.');
  }
});

Object.keys(jsonData).forEach(function(key, value){
  var options = {
    url: GA_URL_ENDPOINT,
    headers: { 'User-Agent': UA },
    form: {
      v: GA_VERSION,
      tid: gaTrackingId,
      cid: GA_CLIENT_ID,
      t: GA_HIT_TYPE,
      ec: GA_EVENT_CATEGORY ,
      ea: gaEventAction,
      el: key,
      ev: value
    }
  };
  request.post(options, function (error, response) {
      if (!error && response.statusCode == 200) {
        bar.tick();
        if(bar.complete) {
          console.log(chalk.green('Completed: The data is sent to ' + gaTrackingId));
        }
      } else {
        util.error(error);
      }
    }
  );
});
