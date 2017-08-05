/**
 * Created by txl-pc on 2017/7/21.
 */
var webpackConfig = require('./webpack.base.config')
var config = require('../config')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var merge = require('webpack-merge')
var utils = require('./utils')
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name])
})

module.exports = merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders()
  },
  output: {
    publicPath: config.dev.assetsPublicPath
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
        title: '哈哈哈哈哈',
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }
    ),
    new FriendlyErrorsPlugin()
  ]
})