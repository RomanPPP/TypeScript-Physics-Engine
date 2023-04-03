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
      import: "./demo/ball/ball.ts",
      filename: "./ball.js",
    },
    
    stack : {
      import : "./demo/stack/stack.ts",
      filename : "./stack.js"
    },
    joints : {
      import : "./demo/joints/joints.ts",
      filename : "./joints.js"
    }
  },
  devtool: "inline-source-map",
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,

      algorithm: "gzip",
      deleteOriginalAssets: false,
    }),
  ],
};
