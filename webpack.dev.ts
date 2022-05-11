import webpack from "webpack";
import { merge } from "webpack-merge";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
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
  plugins: [new ForkTsCheckerWebpackPlugin()],
});

export default devConfig;
