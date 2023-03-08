const Koa = require('koa')
const Json = require('koa-json')
const config = require('./config')
const router = require('./routes')
const { join, resolve } = require('path')
const static = require('koa-static')

const initServer = function (path) {
  // console.log('当前路径:: ', path)
  // 命令行 启动页
  global.isProduction = true
  const app = new Koa()

  app.use(static(join(__dirname, '../../low-code/client')))
  app.use(Json())
  app.use(router.routes())

  app.listen(config.port, () => {
    console.log('服务器启动完成:')
    console.log(
      ` - Local:   \x1B[36m http://localhost:\x1B[0m\x1B[96m${config.port} \x1B[0m`
    )
    console.log(
      ` - Network: \x1B[36m http://${config.ip}:\x1B[0m\x1B[96m${config.port} \x1B[0m`
    )
  })
}

module.exports = initServer
