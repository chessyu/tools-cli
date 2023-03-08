const Router = require('koa-router')
const rootRoute = require('./rootRoute')
const historyTemplate = require('./historyTemplate')

const router = new Router()

router.use(rootRoute.routes())
router.use(historyTemplate.routes())

module.exports = router
