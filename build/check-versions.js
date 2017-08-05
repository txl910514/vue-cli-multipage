var chalk = require('chalk') // 终端提示美化
var semver = require('semver') // 语义化版本检查插件（The semantic version parser used by npm）
var packageConfig = require('../package.json')
var shell = require('shelljs') // shell命令
// 开辟子进程执行指令cmd并返回结果
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
  /**
   * child_process.execSync(command[, options])
   * command <string> 要运行的命令，用空格分隔参数
   * options <Object>
   cwd <string> 子进程的当前工作目录
   input <string> | <Buffer> | <Uint8Array>} 要作为 stdin 传给衍生进程的值
   提供该值会覆盖 stdio[0]
   stdio <string> | <Array> 子进程的 stdio 配置。（默认: 'pipe'）
   stderr 默认会输出到父进程中的 stderr，除非指定了 stdio
   env <Object> 环境变量键值对
   shell <string> 用于执行命令的 shell （默认：在 UNIX 上为 '/bin/sh'，在 Windows 上为 'cmd.exe'。 该 shell 应该能够理解 UNIX 的 -c 开关或 Windows 的 /d /s /c 开关。 在 Windows 中，命令行的解析应与 cmd.exe 兼容。）
   uid <number> 设置该进程的用户标识。（详见 setuid(2)）
   gid <number> 设置该进程的组标识。（详见 setgid(2)）
   timeout <number> 进程允许运行的最大时间数，以毫秒为单位。（默认: undefined）
   killSignal <string> | <integer> 当衍生进程将被杀死时要使用的信号值。（默认: 'SIGTERM'）
   maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 See caveat at maxBuffer and Unicode.
   encoding <string> 用于所有 stdio 输入和输出的编码。（默认: 'buffer'）
   *
   * */
}

// node和npm版本需求
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version), // semver.clean(process.version) 去除版本前缀
    versionRequirement: packageConfig.engines.node
  },
]
// shell.which('npm') 判断是否有npm
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 执行cmd
    versionRequirement: packageConfig.engines.npm
  })
}
// console.log(semver.satisfies('4.8.2', '>= 4.5.6'))  // 如果版本满足范围，返回true
module.exports = function () {
  var warnings = []
  // 依次判断版本是否符合要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) { // 如果版本满足范围，返回true
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
// 如果有警告则将其输出到控制台
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}
