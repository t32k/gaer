#!/usr/bin/env node

'use strict';

var _ = require('underscore');
var chalk = require('chalk');
var request = require('request');
var program = require('commander');

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
  return false;
} else if (gaTrackingId.indexOf('UA-') !== 0) {
  console.log(chalk.red('`tid` option is invalid.'));
  return false;
}

// GA Event Action Name
if (!program.action){
  console.log(chalk.red('`action` option is required.'));
  return false;
}
var gaEventAction = program.action;

var gaEvenLabel = 'Selecotors';
var gaEventValue = 80;

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
    el: gaEvenLabel,
    ev: gaEventValue
  }
};

// request.post(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(chalk.green('Success!'));
//     } else {
//       console.log(chalk.red('Error: ', error));
//     }
//   }
// );