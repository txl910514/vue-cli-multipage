/**
 * Created by txl-pc on 2017/7/21.
 */
require('./check-versions')()
var ora = require('ora') // node命令上的load
var webpack = require('webpack')
var rm = require('rimraf') // 删除文件和文件夹
var path = require('path')
var chalk = require('chalk') // 终端提示美化
var config = require('../config')
var webpackConfig = require('./webpack.prod.config')
var spinner = ora('building for '+ process.env.NODE_ENV +'...')
spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    // 显示打包信息
    process.stdout.write(stats.toString({
        colors: true, // 等同于 webapck --colors
        modules: false,   // 增加内置的模块信息
        children: false,  // 增加子级的信息
        chunks: false,    // 增加包信息（设置为 `false` 能允许较少的冗长输出）
        chunkModules: false  // 将内置模块信息增加到包信息
      }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})