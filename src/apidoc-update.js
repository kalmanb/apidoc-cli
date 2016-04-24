#!/usr/bin/env node --harmony

import { default as program } from 'commander';
import { default as request } from 'superagent';
import { default as fp } from 'lodash/fp';
import fs from 'fs';
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


// console.log('Updating');
function generateCode(url) {
  request.get(url)
    .end((err, res) => {
      const files = res.body.files;

      fp.forEach((file) => {
        const filename = `${file.dir}/${file.name}`;
        fs.writeFile(filename, file.contents, (error) => {
          if (error) {
            return console.log(error);
          }
          return console.log('The file was saved!');
        });
      })(files);
    });
}

exports.update = function update() {
  const config = configuration.getConfig(program.config);
  fp.forEach((value, org) => {
    fp.forEach((app, appKey) => {
      fp.forEach((directory, generator) => {
        const url = fp.join('/', [config.api_uri, org, appKey, app.version, generator]);
        generateCode(url, directory);
      })(app.generators);
    })(value);
  })(exports.settings.code);
};

