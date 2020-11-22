const htmlWebPackPlugin = require('html-webpack-plugin')
const cssPlugin = require('mini-css-extract-plugin')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')

module.exports = env => {
  return {
    module: {
      rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: [
            env.NODE_ENV === 'production' ? cssPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|gif|svg)$/,
          use: ['file-loader']
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[hash].js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new htmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      }),
      new webpack.DefinePlugin({}),
      new cssPlugin({
        filename: '[name].css'
      }),
      new Dotenv()
    ],
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: 8000
    },
    resolve: {
      alias: {
        '@actions': path.resolve(__dirname, 'src/actions'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@reducers': path.resolve(__dirname, 'src/reducers'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@store': path.resolve(__dirname, 'src/store'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@views': path.resolve(__dirname, 'src/views')
      },
      extensions: ['.ts', '.tsx', '.js', '.scss']
    }
  }
}
