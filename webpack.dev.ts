import webpack from "webpack";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import Dotenv from "dotenv-webpack";
import "webpack-dev-server";

import commonConfig from "./webpack.config";

const devConfig: webpack.Configuration = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new Dotenv({ path: "./.env.dev", systemvars: true })],
});

export default devConfig;
