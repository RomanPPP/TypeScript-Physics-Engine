const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: true,

    port: 8080,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  entry: {
    wall: {
      import: "./test.ts",
      filename: "./test.js",
    },
    
    stack : {
      import : "./stack.ts",
      filename : "./stack.js"
    },
    stackNocache : {
      import : "./stackNoCacheContact.ts",
      filename : "./stackNoCacheContact.js"
    }
  },
  devtool: "inline-source-map",
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,

      algorithm: "gzip",
      deleteOriginalAssets: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "test.html"),
      filename: "index.html",
    }),
  ],
};
