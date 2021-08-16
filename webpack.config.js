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
  const isProductionEnv = process.env.NODE_ENV === "production";
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
        components: path.resolve(__dirname, "src", "components"),
        containers: path.resolve(__dirname, "src", "containers"),
        hooks: path.resolve(__dirname, "src", "hooks"),
        pages: path.resolve(__dirname, "src", "pages"),
        static: path.resolve(__dirname, "src", "static"),
        styles: path.resolve(__dirname, "src", "styles"),
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
      new Dotenv(),
      isDevelopmentEnv && new ReactRefreshWebpackPlugin(),
      isDevelopmentEnv && new webpack.HotModuleReplacementPlugin(),
      isDevelopmentEnv && new BundleAnalyzerPlugin({ analyzerMode: "server", analyzerPort: 4000, openAnalyzer: false }),
      isProductionEnv && new BundleAnalyzerPlugin({ analyzerMode: "static" }),
      isProductionEnv && new webpack.LoaderOptionsPlugin({ minimize: true }),
      isProductionEnv &&
        new CopyPlugin({
          patterns: [
            { from: path.join(__dirname, "public", "robots.txt"), to: path.join(__dirname, "dist", "robots.txt") },
          ],
        }),
      new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopmentEnv ? "development" : "production" }),
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
    ].filter(Boolean),
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].[hash:8].js",
      publicPath: "/",
    },
  };
};
