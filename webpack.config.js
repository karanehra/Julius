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
        "@actions": path.resolve(__dirname, "src/actions"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@constants": path.resolve(__dirname, "src/constants"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@views": path.resolve(__dirname, "src/views")
      },
      extensions: [".js", ".scss"]
    }
  };
};
