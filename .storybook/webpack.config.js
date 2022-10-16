const path = require("path");

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    apis: path.resolve(__dirname, "../src", "apis"),
    common: path.resolve(__dirname, "../src", "common"),
    components: path.resolve(__dirname, "../src", "components"),
    constants: path.resolve(__dirname, "../src", "constants"),
    containers: path.resolve(__dirname, "../src", "containers"),
    fireConfig: path.resolve(__dirname, "../src", "fireConfig"),
    fixtures: path.resolve(__dirname, "../src", "fixtures"),
    hooks: path.resolve(__dirname, "../src", "hooks"),
    services: path.resolve(__dirname, "../src", "services"),
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
