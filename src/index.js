#!/usr/bin/env node --harmony

import program from 'commander';
// import update from './apidoc-update';

// list organizations
// list applications <org>
// list versions <org> <app>
// --limit 10
// --offset 10

// code <org> <app> <version> <generator>  // lists files
// code <org> <app> <version> <generator> <filename>

// update [--path <path-to-.apidoc>]

program
  .version('0.1.0')
  .command('update', 'update current projects generated files')
  .option('-c, --config <path>', 'set config path. defaults to ~/.apidoc/config');

program.parse(process.argv);
