const htmlWebPackPlugin = require("html-webpack-plugin");
const cssPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");
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
          use: [
            env.NODE_ENV === "production" ? cssPlugin.loader : "style-loader",
            "css-loader",
            "sass-loader"
          ]
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
      new webpack.DefinePlugin({}),
      new cssPlugin({
        filename: "[name].css"
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
        "@components": path.resolve(__dirname, "src/components"),
        "@views": path.resolve(__dirname, "src/views"),
        "@actions": path.resolve(__dirname, "src/actions"),
        "@constants": path.resolve(__dirname, "src/constants"),
      },
      extensions: [".js", ".scss"]
    }
  };
};
