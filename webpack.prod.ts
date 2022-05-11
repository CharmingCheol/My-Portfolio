import * as webpack from "webpack";
import { merge } from "webpack-merge";

import commonConfig from "./webpack.config";

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: "production",
  devtool: "hidden-source-map",
});

export default prodConfig;
