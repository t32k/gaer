#!/usr/bin/env node
'use strict';

var fs = require('fs');
var program = require('commander');
var pkg = require('../package.json');
var util = require('../lib/util');
var gaer = require('../lib/gaer');

program
  .version(pkg.version)
  .usage('[options] <JSON>')
  .option('-t, --tid [ID]', 'set your Google Analitics tracking ID')
  .option('-r, --report [Name]', 'set your Action report name')
  .option('-s, --stdin', 'Input JSON using stdin')
  .parse(process.argv);

if (!program.args.length) {
  util.error('No input file specified.');
}

// Google Analytics Tracking ID (EX: 'UA-12345-6')
var gaTrackingId = process.env.GA_TID || program.tid || '';
gaTrackingId = gaTrackingId.toUpperCase();
if (gaTrackingId === '') {
  util.error('--tid option is required.');
} else if (gaTrackingId.indexOf('UA-') !== 0) {
  util.error('--tid option is invalid.');
}

// GA Event Action Name
var gaEventAction = process.env.GA_REPORT || program.report || '';
if (gaEventAction === '') {
  util.error('--report option is required.');
}

// GA Repot Data
var reportData = program.args[0];
if (util.isFile(reportData)) {
  var strings = fs.readFileSync(reportData, {
    encoding: 'utf8'
  });
  try {
    reportData = JSON.parse(strings);
  } catch (error) {
    throw util.error(error);
  }
} else {
  util.error('argument must be JSON');
}

// Check values
Object.keys(reportData).forEach(function (key, value) {
  if (isNaN(value)) {
    util.error('`value` must be numeric.');
  }
});

gaer(gaTrackingId, gaEventAction, reportData);