const htmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require('webpack')
module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.s?css$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(png|gif|svg)$/,
          use: ["file-loader"]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[hash].js"
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    },
    plugins: [
      new htmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      })
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 8000
    },
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "src/styles"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@components": path.resolve(__dirname, "src/components")
      },
      extensions: [".js", ".scss"]
    }
  };
};
