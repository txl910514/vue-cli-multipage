/**
 * Created by txl-pc on 2017/7/21.
 */
require('./check-versions')()
var config = require('../config')
var path = require('path')
var opn = require('opn')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config')
var webpackDevMiddleware = require("webpack-dev-middleware");
var proxyMiddleware = require('http-proxy-middleware')

var port = process.env.PORT || config.dev.port
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var proxyTable = config.dev.proxyTable
var app = express();
var compression = require('compression')
// 开启gzip
app.use(compression());
var compiler = webpack(webpackConfig);
// 让vue 的html5模式显得更真实
app.use(require('connect-history-api-fallback')())
var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true //显示控制台
})
app.use(devMiddleware);

var hotMiddleware = require('webpack-hot-middleware')(compiler)
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    // 发布事件
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})
app.use(hotMiddleware)

Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

//挂载静态资源
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})
// 包有效或重新有效时执行
devMiddleware.waitUntilValid(() => {
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
   _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

