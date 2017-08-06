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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['index','server'], //提取哪些模块共有的部分
      minChunks: 2 // 提取至少2个模块共有的部分
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
var pages =  utils.getMultiEntry('./src/pages/*/*.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true,             // js插入位置
    minify: {
      removeComments: true, // 去掉html注释
      collapseWhitespace: true, //折叠空白区域
      removeAttributeQuotes: true // 可接受的去除属性的引号
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  prodConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
module.exports = prodConfig


