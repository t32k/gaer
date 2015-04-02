#!/usr/bin/env node

'use strict';

var _ = require('underscore');
var program = require('commander');

program
  .version(require('../package.json').version)
  .usage('[options] <file ...>')
  .parse(process.argv);

if (!program.args.length) {
  console.log(chalk.red('\n No input file specified.'));
  program.help();
}