const inquirer = require('inquirer')
const fs = require('fs')
const shell = require('shelljs')
const { resolve, join } = require('path')
const { transform } = require('./lib.js')
const { EMPTYMODEL } = require(resolve(
  global.config_path,
  '__CUSTOMCLICONFIG__/baseConf.js'
))

async function handleEmpty(source, cmd) {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 选择自定义生成空文件模块',
        name: 'modules',
        choices: function (answers) {
          return EMPTYMODEL.map((item, i) => {
            return {
              value: item.value,
              name: item.name,
              checked: i === 0
            }
          })
        }
      }
    ])
    .then(answers => {
      const files = fs.readdirSync(resolve('./')).filter(item => item == source)

      if (files.length)
        return console.log(
          ` \n  👀${transform(
            '当前路径已存在 ' + source + ' 目录, 请重命名 '
          )}🐖 \n `
        )

      let selectModel = EMPTYMODEL.filter(
        item => item.value == answers.modules
      )[0]

      let configData = selectModel.jsonConfig

      let dirs = configData.folder.map(item => {
        let seizeSeat = item.split('/')
        seizeSeat = seizeSeat.map(keys => {
          return deepCreate(keys, source)
        })
        return seizeSeat.join('/')
      })
      let fileList = configData.files.map(item => {
        let seizeSeat = item.split('/')
        seizeSeat = seizeSeat.map(keys => {
          let fileNames = keys.split('.')
          if (fileNames.length > 1) {
            return deepCreate(fileNames[0], source) + '.' + fileNames[1]
          }
          return deepCreate(keys, source)
        })
        return seizeSeat.join('/')
      })
      try {
        shell.mkdir('-p', dirs)
        shell.touch(fileList)
        console.log(`\n  ${transform('模块文件已生成 ')} 🍻 \n`)
      } catch (err) {
        console.log(`\n  ${transform(err)}\n`)
      }
    })
}

function deepCreate(keys, source) {
  if (keys == '**') keys = source
  if (keys == '***')
    keys = source.substring(0, 1).toUpperCase() + source.substring(1)
  if (keys == '****') keys = source.toUpperCase()
  return keys
}

module.exports = (...arg) => handleEmpty(...arg)
