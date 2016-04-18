
import chai from 'chai';
import expect from 'chai';
import fs from 'fs';
import { default as request } from 'superagent';
import mocker from 'superagent-mocker';

import update from '../lib/apidoc-update';

const mock = mocker(request);

update.settings = {
  code: {
    testOrg: {
      testApp: {
        version: '1.0.0',
        generators: {
          name1: 'path1',
          name2: 'path2',
        },
      },
    },
  },
};

describe('Test Updating', () => {
  it('aa', () => {
    mock.get('http://api.apidoc.me/:org/:app/:version/:generator', (req) => {
      return {
        a: req.params.org,
        b: req.params.app,
        c: req.params.generator,
        text: 'Hello World!',
      };
    });

    update.update();

    // TODO Mock fs
    // const result = fs.readFile('./test/me.scala', (err, data) => {
    //   console.log('bbb')
    //   console.log(data)
    // })
  });
});
