#!/usr/bin/env node

'use strict';
var fs = require('fs');
var _ = require('underscore');
var chalk = require('chalk');
var request = require('request');
var program = require('commander');
var ProgressBar = require('progress');

var util = require('../lib/util');

var TOOL_NAME = 'GAER';
var GA_URL_ENDPOINT = 'https://ssl.google-analytics.com/collect';
var GA_VERSION = 1;
var GA_CLIENT_ID = Math.round(2147483647 * Math.random());
var GA_HIT_TYPE = 'event';
var GA_EVENT_CATEGORY = TOOL_NAME;


program
  .version(require('../package.json').version)
  .usage('[options] <JSON>')
  .option('-t, --tid [ID]', 'set your Google Analitics tracking ID')
  .option('-a, --action [Name]', 'set your Action report name')
  .option('-s, --stdin', 'Input JSON using stdin')
  .parse(process.argv);


if (!program.args.length) {
  console.log(chalk.red('\n No input file specified.'));
  program.help();
}


// Google Analytics Tracking ID (EX: 'UA-12345-6')
var gaTrackingId = process.env.GA_TID || program.tid || '';
gaTrackingId = gaTrackingId.toUpperCase();

if (gaTrackingId === '') {
  console.log(chalk.red('`tid` option is required.'));
  process.exit();
} else if (gaTrackingId.indexOf('UA-') !== 0) {
  console.log(chalk.red('`tid` option is invalid.'));
  process.exit();
}


// GA Event Action Name
if (!program.action){
  console.log(chalk.red('`action` option is required.'));
  process.exit();
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
} else if (_.isObject(program.args[0])) {
  jsonData = program.args[0];
}

var bar = new ProgressBar('Sending [:bar] :percent', {
  complete: '|',
  incomplete: '+',
  width: 24,
  total: _.size(jsonData)
});

_.each(jsonData, function(value, key){
  var options = {
    url: GA_URL_ENDPOINT,
    headers: { 'User-Agent': TOOL_NAME },
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
          console.log(chalk.green('Complete!\n'));
        }
      } else {
        console.log(chalk.red('Error: ', error));
      }
    }
  );
});







function postData(key, value) {

}