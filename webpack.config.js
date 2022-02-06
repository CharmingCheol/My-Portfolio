const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = () => {
  const isDevelopmentEnv = process.env.NODE_ENV === "development";
  // const isProductionEnv = process.env.NODE_ENV === "production";
  return {
    mode: isDevelopmentEnv ? "development" : "production",
    devtool: isDevelopmentEnv ? "inline-source-map" : "hidden-source-map",
    node: {
      fs: "empty",
      net: "empty",
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts", ".json", ".scss"],
      modules: [path.join(__dirname, "src"), "node_modules"],
      alias: {
        common: path.resolve(__dirname, "src", "common"),
        components: path.resolve(__dirname, "src", "components"),
        containers: path.resolve(__dirname, "src", "containers"),
        fireconfig: path.resolve(__dirname, "src", "fireconfig"),
        hooks: path.resolve(__dirname, "src", "hooks"),
        pages: path.resolve(__dirname, "src", "pages"),
        reducers: path.resolve(__dirname, "src", "reducers"),
        static: path.resolve(__dirname, "src", "static"),
        store: path.resolve(__dirname, "src", "store"),
        styles: path.resolve(__dirname, "src", "styles"),
        types: path.resolve(__dirname, "src", "types"),
        utils: path.resolve(__dirname, "src", "utils"),
      },
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, "dist"),
      stats: "errors-warnings",
      overlay: true,
    },
    entry: path.join(__dirname, "src", "index"),
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader",
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "static/media",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv({ systemvars: true }),
      new webpack.HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, "public", "robots.txt"), to: path.join(__dirname, "dist", "robots.txt") },
        ],
      }),
      new HtmlWebpackPlugin({
        inject: "body",
        template: path.join(__dirname, "public", "/index.html"),
      }),
      new FaviconsWebpackPlugin({
        logo: path.join(__dirname, "public", "/logo.png"),
      }),
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: "./src/**/*.{ts,tsx,js,jsx}",
        },
      }),
    ],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[hash:8].js",
      publicPath: "/",
    },
  };
};
