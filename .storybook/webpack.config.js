const path = require("path");

module.exports = ({ config }) => {
  config.node = {
    ...config.node,
    fs: "empty",
    net: "empty",
  };
  config.resolve.alias = {
    ...config.resolve.alias,
    "@apis": path.resolve(__dirname, "../src", "apis"),
    "@common": path.resolve(__dirname, "../src", "common"),
    "@components": path.resolve(__dirname, "../src", "components"),
    "@hooks": path.resolve(__dirname, "../src", "hooks"),
    "@pages": path.resolve(__dirname, "../src", "pages"),
    "@reducers": path.resolve(__dirname, "../src", "reducers"),
    "@static": path.resolve(__dirname, "../src", "static"),
    "@styles": path.resolve(__dirname, "../src", "styles"),
    "@typings": path.resolve(__dirname, "../src", "typings"),
    "@utils": path.resolve(__dirname, "../src", "utils"),
  };

  return config;
};
