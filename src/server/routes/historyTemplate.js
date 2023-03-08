const Router = require('koa-router')
const historyTemplateControll = require('../controller/historyTemplateController')

const router = new Router()

/** 获取列表 */
router.post(
  '/api/history-template/get',
  historyTemplateControll.getHistoryTemplateControll
)

router.post(
  '/api/history-template/add',
  historyTemplateControll.getHistoryTemplateControll
)

module.exports = router
