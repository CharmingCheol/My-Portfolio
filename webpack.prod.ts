import * as webpack from "webpack";
import { merge } from "webpack-merge";
import Dotenv from "dotenv-webpack";

import commonConfig from "./webpack.config";

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: "production",
  devtool: "hidden-source-map",
  plugins: [new Dotenv({ path: "./.env.prod", systemvars: true })],
});

export default prodConfig;
