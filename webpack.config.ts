import path from "path";
import webpack from "webpack";
import Dotenv from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

const config: webpack.Configuration = {
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      api: path.resolve(__dirname, "./src/api/"),
      apis: path.resolve(__dirname, "./src/apis/"),
      common: path.resolve(__dirname, "src/common/"),
      components: path.resolve(__dirname, "src/components/"),
      containers: path.resolve(__dirname, "src/containers/"),
      constants: path.resolve(__dirname, "src/constants/"),
      fireConfig: path.resolve(__dirname, "src/fireConfig/"),
      fixtures: path.resolve(__dirname, "src/fixtures/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      pages: path.resolve(__dirname, "src/pages/"),
      reducers: path.resolve(__dirname, "src/reducers/"),
      services: path.resolve(__dirname, "src/services/"),
      static: path.resolve(__dirname, "src/static/"),
      store: path.resolve(__dirname, "src/store/"),
      styles: path.resolve(__dirname, "src/styles/"),
      types: path.resolve(__dirname, "src/types/"),
      utils: path.resolve(__dirname, "src/utils/"),
    },
  },
  entry: "./src/index",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file-loader",
        options: { name: "static/[contenthash].[ext]" },
      },
    ],
  },
  plugins: [
    new Dotenv({ systemvars: true }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new FaviconsWebpackPlugin("./public/logo.png"),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
};

export default config;
