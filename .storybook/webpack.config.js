const path = require("path");

module.exports = ({ config }) => {
  config.node = {
    ...config.node,
    fs: "empty",
    net: "empty",
  };
  config.resolve.alias = {
    ...config.resolve.alias,
    common: path.resolve(__dirname, "../src", "common"),
    components: path.resolve(__dirname, "../src", "components"),
    containers: path.resolve(__dirname, "../src", "containers"),
    fireConfig: path.resolve(__dirname, "../src", "fireConfig"),
    hooks: path.resolve(__dirname, "../src", "hooks"),
    pages: path.resolve(__dirname, "../src", "pages"),
    reducers: path.resolve(__dirname, "../src", "reducers"),
    static: path.resolve(__dirname, "../src", "static"),
    store: path.resolve(__dirname, "../src", "store"),
    styles: path.resolve(__dirname, "../src", "styles"),
    types: path.resolve(__dirname, "../src", "types"),
    utils: path.resolve(__dirname, "../src", "utils"),
  };

  return config;
};
