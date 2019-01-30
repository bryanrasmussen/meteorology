const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
require("babel-polyfill");

module.exports = {
  entry: ["babel-polyfill", './src/server.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};
