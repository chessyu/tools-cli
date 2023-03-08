const shell = require('shelljs')
const { resolve, join } = require('path')
const { transform } = require('./lib.js')
const initServer = require('../src/server')

function ui(cmd) {
  console.log(`\n 🌱🌱 ${transform('服务已启动')}\n`)
  initServer(resolve('./'))

  // setTimeout(() => {
  // shell.cd(resolve(__dirname,"../"))
  // shell.exec('npm run ui', {silent: false})
  // },2000)
}

module.exports = (...arg) => ui(...arg)
