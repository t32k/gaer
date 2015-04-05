#!/usr/bin/env node
'use strict';

var stdin = require('get-stdin');
var program = require('commander');
var pkg = require('../package.json');
var util = require('../lib/util');
var Gaer = require('../lib/gaer');

program
  .version(pkg.version)
  .usage('[options] <JSON>')
  .option('-t, --tid <ID>', 'set your Google Analytics Tracking ID')
  .option('-r, --report <Name>', 'set your GA Action report name')
  .parse(process.argv);

if (process.stdin.isTTY && !program.args.length) {
  util.log('e', 'No input file specified.');
}

// Tracking ID (EX: 'UA-12345-6')
var trackingID = process.env.GA_TID || program.tid || '';

// Action Name
var actionName = process.env.GA_REPORT || program.report || '';

var gaer = new Gaer(trackingID);

// GA Report Data
if (process.stdin.isTTY) {
  var reportData = program.args[0];
  gaer.record(actionName, reportData);
} else {
  stdin(function (data) {
    gaer.record(actionName, data);
  });
}
