const historyTemplateService = require('../service/historyTemplateService')

async function getHistoryTemplateControll(ctx, next) {
  return (ctx.response.body = await historyTemplateService.getHistoryTemplate())
}

async function addHistoryTemplateControll(ctx, next) {
  return (ctx.response.body = await historyTemplateService.addHistoryTemplate())
}

module.exports = {
  getHistoryTemplateControll,
  addHistoryTemplateControll
}
