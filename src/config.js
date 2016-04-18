import { default as reader } from 'properties-reader';

function getUserHome() {
  return process.env.HOME || process.env.USERPROFILE;
}

exports.getConfig = function getConfig(userSpecifiedConfig) {
  const configFile = userSpecifiedConfig || `${getUserHome()}/.apidoc/config`;
  const props = reader(configFile);

  // For now we just support the default profile
  const config = props.path().default;

  // Default the url for apidoc
  if (!config.api_url) {
    config.api_url = 'http://api.apidoc.me';
  }

  return config;
};
