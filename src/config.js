const reader = require('properties-reader');

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

// Export this so we can mock it
exports.getConfigFile = function getConfigFile(userSpecifiedConfig) {
  return userSpecifiedConfig || `${getUserHome()}/.apidoc/config`;
};

exports.getConfig = function getConfig(userSpecifiedConfig) {
  const configFile = exports.getConfigFile(userSpecifiedConfig);
  const props = reader(configFile);

  // For now we just support the default profile
  const config = props.path().default;

  // Default the url for apidoc
  if (!config.api_uri) {
    config.api_uri = 'http://api.apidoc.me';
  }

  return config;
};
