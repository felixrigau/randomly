const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.tsx"),
  plugins: [
    new HtmlWebpackPlugin({
      title: "Randomly",
      template: path.resolve(__dirname, "public/template.html"),
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "public/css") }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
};
