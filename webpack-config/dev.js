const webpackMerge = require('webpack-merge');
const base = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = webpackMerge(base, {
  entry: process.cwd() + '/src/index.js',
  output: {
    filename: '[name].bundle.js'
  },
  devtool: 'eval-source-map' ,
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: process.cwd() + '/src/index.html',
      favicon: process.cwd() + '/src/index.html'
    })
  ],  //enable srouce map
   module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },{
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000,
          hash: 'sha512',
          publicPath: '/',
          name: 'assets/images/[hash].[ext]'
        }
      }
    ]
  }

});
