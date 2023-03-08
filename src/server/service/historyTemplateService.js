const { createdTemplateModel } = require('../config/globModel')
const { findAllUsers } = require('../dbModel/template')

/** 获取系统菜单数据 */
async function getHistoryTemplate() {
  let result = await findAllUsers()

  let relust = {}
  relust.code = 200
  relust.msg = '操作成功'
  relust.data = result
  return relust
}

async function addHistoryTemplate() {
  createdTemplateModel.create(
    {
      name: '张三',
      age: 40,
      sex: '男'
    },
    function (err, docs) {
      if (err) console.log(err)
      console.log('保存成功:' + docs)
    }
  )
}

module.exports = {
  getHistoryTemplate,
  addHistoryTemplate
}
