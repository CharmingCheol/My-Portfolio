module.exports = (on, config) => {
  // eslint-disable-next-line global-require
  const configWithDotenv = require("dotenv").config();
  if (configWithDotenv.error) {
    throw configWithDotenv.error;
  }
  const env = { ...config.env, ...configWithDotenv.parsed };
  const result = { ...config, env };
  return result;
};
