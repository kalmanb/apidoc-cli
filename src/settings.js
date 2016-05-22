const yaml = require('read-yaml');

/* Example:
{
  code: {
    org: {
      project: {
        version: '1.0.0',
        generators: {
          name1: 'path1',
          name2: 'path2'
        }
      }
    }
  }
}
 */
exports.getSettings = function getSettings(userSpecifiedFile) {
  const settingsFile = userSpecifiedFile || '.apidoc';
  const result = yaml.sync(settingsFile);
  return result;
};

