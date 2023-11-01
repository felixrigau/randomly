const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/index.ts"),
  plugins: [
    new HtmlWebpackPlugin({
      title: "Randomly",
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
    extensions: [".tsx", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "public"),
  },
  devtool: "inline-source-map",
};
