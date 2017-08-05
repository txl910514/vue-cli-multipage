/**
 * Created by txl-pc on 2017/7/21.
 */
var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin') // html模版插件
var ExtractTextPlugin = require('extract-text-webpack-plugin') //导出css为link
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin') // 优化css

var prodConfig = merge(webpackConfig, {
  module: {
    rules: utils.styleLoaders({
      extract: true
    })
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  devtool: process.env.NODE_ENV !== 'dev' ? '#source-map' : false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: process.env.NODE_ENV !== 'dev'
    }),
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new HtmlWebpackPlugin({
      title: '哈哈哈哈哈',
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, // 去掉html注释
        collapseWhitespace: true, //折叠空白区域
        removeAttributeQuotes: true // 可接受的去除属性的引号
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency' //控制chunk排序 dependency 按依赖
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    // 复制文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin') //压缩代码为gzip

  prodConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]', // 输出
      algorithm: 'gzip', // 压缩格式
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ), // 原始路径
      threshold: 10240, // 大于此大小 才会启动压缩
      minRatio: 0.8 // 压缩率
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prodConfig.plugins.push(new BundleAnalyzerPlugin())
}
module.exports = prodConfig


