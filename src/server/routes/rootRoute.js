const Router = require('koa-router')
const fs = require('fs')
const { join } = require('path')

const router = new Router()

router.get('/', async ctx => {
  const isProduction = global.isProduction
  if (isProduction) {
    ctx.set('Content-Type', 'text/html')
    ctx.body = fs.readFileSync(
      join(__dirname, '../../../', './low-code/client/index.html')
    )
    return false
  }
  ctx.body = '后台服务已启动'
})

module.exports = router
