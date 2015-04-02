#!/usr/bin/env node

'use strict';

var _ = require('underscore');
var chalk = require('chalk');
var request = require('request');
var program = require('commander');

var GA_VERSION = 1;
var GA_CLIENT_ID = Math.round(2147483647 * Math.random());
var GA_HIT_TYPE = 'event';
var GA_EVENT_CATEGORY = 'GAR';

program
  .version(require('../package.json').version)
  .usage('<Google Tracking ID> <Report Name> <JSON>')
  .parse(process.argv);

if (!program.args.length) {
  console.log(chalk.red('\n No input file specified.'));
  program.help();
}

var gaTrackingId = 'UA-2317436-26';
var gaEventAction = 'StyleStas';
var gaEvenLabel = 'Selecotors';
var gaEventValue = 80;

var options = {
  url: 'https://ssl.google-analytics.com/collect',
  headers: { 'User-Agent': 'GAR' },
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

request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(chalk.green('Success!'));
    } else {
      console.log(chalk.red('Error: ', error));
    }
  }
);