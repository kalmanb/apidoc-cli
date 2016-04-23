#!/usr/bin/env node --harmony

import { default as program } from 'commander';
import { default as request } from 'superagent';
import { default as fp } from 'lodash/fp';
// import fs from 'fs';
import configuration from './config';
import settingsI from './settings';

program
  // .description('update files based on .apidoc config')
  .command('*')
  // .option('-c, --config <config-file>', 'set config path. defaults to ~/.apidoc/config')
  // .option("--settings <settings-file>", "path to .apidoc config, defaults to `.apidoc`")
  // .action((env) => {
  .action(() => {
    // console.log('Updating');
    // console.log('hey');
    // this isn't working because it's not a command

    // this.update(settings, generateCode)
  });
// .on('--help', function() {
//   console.log('  Examples:');
//   console.log();
//   console.log('    $ ...');
//   console.log();
// // })
// }).parse(process.argv);
program.parse(process.argv);

exports.settings = settingsI.getSettings(program.settings);
exports.config = configuration.getConfig(program.config);

// console.log('Updating');

function temp(a) { return a; }

// function generateCode(url, directory) {
function generateCode(url) {
  // console.log(url);
  // request.get('http://api.apidoc.me/teambytes/hipchat-sns-bridge/1.0.0/play_2_x_routes')
  request.get(url)
    .end((err, res) => {
      temp(res);
      // const code = res.text;
      // console.log(code);
      //   fp.forEach(function (file) {
      //     console.log(file.name)
      //   })(code.files)

      // console.log('Updating Complete');
    });
}

exports.update = function update() {
  fp.forEach((value, org) => {
    fp.forEach((app, appKey) => {
      fp.forEach((directory, generator) => {
        const url = fp.join('/', [exports.config.api_url, org, appKey, app.version, generator]);
        generateCode(url, directory);
      })(app.generators);
    })(value);
  })(exports.settings.code);
};

// var stream = fs.createWriteStream('test.scala');

