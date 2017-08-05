/**
 * Created by txl-pc on 2017/7/25.
 */
var path = require('path')
module.exports = {
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    port: 3009,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/mock': {
        target: 'http://127.0.0.1:4090',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      }
    }
  }
}