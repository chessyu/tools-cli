let mongoose = require('mongoose')
let Template = mongoose.model('template')

/* 查找模板 */
exports.findAllUsers = async () => {
  let query = Template.find()
  let res = []
  await query.exec(function (err, users) {
    if (err) {
      res = []
    } else {
      res = users
    }
  })
  return res
}

/* 查找特定模板 */
exports.findFilterUsers = async params => {
  let nameReg = new RegExp(params.name, 'i')
  let query = Template.find({
    name: {
      $regex: nameReg
    }
  })
  let res = []
  await query.exec(function (err, users) {
    if (err) {
      res = []
    } else {
      res = users
    }
  })
  return res
}

/* 查找单个模板 */
exports.findUser = async params => {
  let query = Template.find({
    id: params.id
  })
  let res = {}
  await query.exec(function (err, tUser) {
    if (err) {
      res = '没有该模板'
    } else {
      res = tUser[0]
    }
  })
  return res
}

/* 新增模板 */
exports.addUser = async user => {
  user = await user.save()
  return user
}

/* 编辑模板 */
exports.updateUser = async user => {
  user = await Template.update(
    { id: user.id },
    {
      $set: {
        name: user.name,
        sex: user.sex,
        area: user.area,
        always: user.always,
        relationship: user.relationship,
        phone: user.phone,
        mobile: user.mobile,
        desc: user.desc
      }
    }
  )
  return user
}

/* 删除模板 */
exports.deleteUser = async ({ id }) => {
  let flag = false
  console.log('flag==========>' + flag)
  await Template.remove({ id }, function (err) {
    if (err) {
      flag = false
    } else {
      flag = true
    }
  })
  console.log('flag=====await=====>' + flag)
  return flag
}
