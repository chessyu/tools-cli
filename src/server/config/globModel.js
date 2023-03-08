const mongoose = require('mongoose')
const Schema = mongoose.Schema

/** 历史模板  */
const templateSchema = new Schema({
  name: String,
  remark: Number,
  imgUrl: String,
  created: String
})
const createdTemplateModel = mongoose.model('template', templateSchema)

module.exports = {
  createdTemplateModel
}
