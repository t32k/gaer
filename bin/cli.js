#!/usr/bin/env node

'use strict';

var _ = require('underscore');
var chalk = require('chalk');
var program = require('commander');
var request = require('request');
var qs = require('querystring');


program
  .version(require('../package.json').version)
  .usage('[options] <file ...>')
  .parse(process.argv);

if (!program.args.length) {
  console.log(chalk.red('\n No input file specified.'));
  program.help();
}

var GA_VERSION = 1;
var GA_CLIENT_ID = '35009a79-1a05-49d7-b876-2b884d0f825a';
var GA_HIT_TYPE = 'event';
var GA_EVENT_CATEGORY = 'GAR';

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