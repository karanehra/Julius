const htmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use:["babel-loader"]
      },
      {
        test:/\.s?css$/,
        use:["style-loader","css-loader","sass-loader"]
      },
      {
        test:/\.(png|gif|svg)$/,
        use:["file-loader"]
      }
    ]
  },
  plugins:[
    new htmlWebPackPlugin({
      template:'./src/index.html',
      filename:'./index.html'
    })
  ],
  devServer:{
    historyApiFallback:true,
    hot:true,
    port:8000
  },
  resolve:{
    alias:{
      '@styles':path.resolve(__dirname,'src/styles'),
      '@assets':path.resolve(__dirname,'src/assets')
    }
  }
};