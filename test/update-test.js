// const chai = require('chai');
// const expect = chai.expect;

const fs = require('fs');

const request = require('superagent');
const sinon = require('sinon');
const update = require('../src/apidoc-update');
const config = require('../src/config');

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

describe('Full Update', () => {
  it('should get two different generators, one with two files', () => {
    const getConfig = sinon.stub(config, 'getConfigFile');
    getConfig.returns('./test/test-config.apidoc');

    const response1 = {
      files: [
        {
          name: 'TestOne.scala',
          dir: 'com/github/one',
          contents: '// First File\n// Yep a file',
        },
        {
          name: 'TestTwo.scala',
          dir: 'com/github/one',
          contents: '// First Second File\n// Yep a file',
        },
      ],
    };
    const response2 = {
      files: [
        {
          name: 'TestTwo.scala',
          dir: 'com/github/two',
          contents: '// Second File\n// Yep a file',
        },
      ],
    };

    const get = sinon.stub(request, 'get');
    get.withArgs('http://localhost:9001/testOrg/testApp/1.0.0/name1').returns({
      end: (callback) => {
        callback(null, { ok: true, body: response1 });
      },
    });

    get.withArgs('http://localhost:9001/testOrg/testApp/1.0.0/name2').returns({
      end: (callback) => {
        callback(null, { ok: true, body: response2 });
      },
    });

    const write = sinon.stub(fs, 'writeFile');

    update.update();

    sinon.assert.calledWith(write, 'com/github/one/TestOne.scala', response1.files[0].contents);
    sinon.assert.calledWith(write, 'com/github/one/TestTwo.scala', response1.files[1].contents);
    sinon.assert.calledWith(write, 'com/github/two/TestTwo.scala', response2.files[0].contents);

    // TODO - create directory if not there
    // TODO - use config path as prefix with ...

    getConfig.restore();
    get.restore();
    write.restore();
  });
});
