const htmlWebPackPlugin = require("html-webpack-plugin");
const Brotli = require("brotli-webpack-plugin");
const path = require("path");
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
    plugins: [
      new htmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
      ...(env.NODE_ENV === "production"
        ? [
            new Brotli({
              asset: "[path].br[query]",
              test: /\.(js|css|html|svg)$/,
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: true
            })
          ]
        : [])
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 8000
    },
    resolve: {
      alias: {
        "@styles": path.resolve(__dirname, "src/styles"),
        "@assets": path.resolve(__dirname, "src/assets")
      }
    }
  };
};
