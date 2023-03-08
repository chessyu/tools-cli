const Koa = require('koa')
const Json = require('koa-json')
const config = require('./config')
const router = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb://192.168.0.251:27017/node_cli', err => {
  if (err) console.log('mongonDB连接失败了')
  console.log('mongonDB 连接成功')
})

const app = new Koa()

app.use(Json())
app.use(router.routes())

app.listen(config.port, () => {
  // 项目内启动页
  console.log('服务器启动完成:')
  console.log(
    ` - Local:   \x1B[36m http://localhost:\x1B[0m\x1B[96m${config.port} \x1B[0m`
  )
  console.log(
    ` - Network: \x1B[36m http://${config.ip}:\x1B[0m\x1B[96m${config.port} \x1B[0m`
  )
})
