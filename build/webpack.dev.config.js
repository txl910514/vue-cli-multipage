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
    new FriendlyErrorsPlugin()
  ]
})
var pages =  utils.getMultiEntry('./src/pages/*/*.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true              // js插入位置
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}