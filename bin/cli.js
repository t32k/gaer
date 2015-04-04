#!/usr/bin/env node
'use strict';

var fs = require('fs');
var stdin = require('get-stdin');
var program = require('commander');
var pkg = require('../package.json');
var util = require('../lib/util');
var gaer = require('../lib/gaer');

program
  .version(pkg.version)
  .usage('[options] <JSON>')
  .option('-t, --tid <ID>', 'set your Google Analytics Tracking ID')
  .option('-r, --report <Name>', 'set your GA Action report name')
  .parse(process.argv);

if (process.stdin.isTTY && !program.args.length) {
  util.log('e', 'No input file specified.');
}

// Google Analytics Tracking ID (EX: 'UA-12345-6')
var gaTrackingId = process.env.GA_TID || program.tid || '';
gaTrackingId = gaTrackingId.toUpperCase();
if (gaTrackingId === '') {
  util.log('e', '--tid option is required.');
} else if (gaTrackingId.indexOf('UA-') !== 0) {
  util.log('e', '--tid option is invalid.');
}

// GA Event Action Name
var gaEventAction = process.env.GA_REPORT || program.report || '';
if (gaEventAction === '') {
  util.log('e', '--report option is required.');
}

// GA Report Data
var reportData = '';
if (process.stdin.isTTY) {
  reportData = program.args[0];
  if (util.isFile(reportData)) {
    var strings = fs.readFileSync(reportData, {
      encoding: 'utf8'
    });
    reportData = util.parseJSON(strings);
  } else {
    util.log('e', 'argument must be JSON file');
  }
  gaer(gaTrackingId, gaEventAction, reportData);
} else {
  stdin(function (data) {
    reportData = util.parseJSON(data);
    gaer(gaTrackingId, gaEventAction, reportData);
  });
}
