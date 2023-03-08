/*
 * @Description:
 * @Author:  chessyu
 * @Date: 2021-08-06 14:35:42
 */
const inquirer = require('inquirer')
const fs = require('fs')
const { resolve, join } = require('path')
const { run } = require('runjs')
const {
  transform,
  checkFolder,
  getFilesName,
  titleCase,
  requireContext,
  checkDirectory,
  copyFolder
} = require('./lib.js')

const { BASEPATH, VIEWPATH } = require(resolve(
  global.config_path,
  '__CUSTOMCLICONFIG__/baseConf.js'
))

async function init(source, destination) {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 选择需要生成的框架代码',
        name: 'frame',
        choices: function () {
          let folderName = getFilesName(
            global.config_path + '__CUSTOMCLICONFIG__'
          ).filter(item => !item.includes('.'))
          return folderName
        },
        prefix: 'prefix'
      },
      {
        type: 'list',
        message: '[多选] 选择模块包含的端',
        name: 'includesFiles',
        choices: function (answers) {
          let checkBox = getFilesName(
            global.config_path + '__CUSTOMCLICONFIG__/' + answers.frame
          ).filter(keys => keys == 'pc' || keys == 'mobile')
          if (checkBox.length == 0) {
            console.info(
              `\n  🔥【__CUSTOMCLICONFIG__】目录下没有查询到 mobile、pc 的目录，请先创建并写入模板文件！ \n`
            )
            process.exit(-1)
          }
          return checkBox.map((item, index) => {
            if (item == 'pc' || item == 'mobile') {
              return {
                value: item,
                name: item == 'mobile' ? '移动端' : 'PC端',
                checked: index == 0
              }
            }
          })
        },
        prefix: 'suffix'
      },
      {
        type: 'list',
        message: `[单选] 选择移动端组件基本页面的布局`,
        name: 'layout',
        suffix: 'suffix',
        choices: function (answers) {
          if (answers.includesFiles.includes('mobile')) {
            let module = requireContext(
              global.config_path +
                '__CUSTOMCLICONFIG__/' +
                answers.frame +
                '/' +
                answers.includesFiles,
              false,
              /kht\.config\.js$/
            )

            let choices = []
            if (module.keys().length > 0) {
              module.keys().forEach(item => {
                choices = module(item)
              })
            } else {
              console.info(
                `\n  🧱 未检索到 【__CUSTOMCLICONFIG__/${answers.frame}/${answers.includesFiles}/index.js】的配置文件 ，请先创建并写入相关模板信息的配置文件！ \n`
              )
              process.exit(-1)
            }

            return choices.map(item => ({
              name: item.selectName,
              value: item.folderName
            }))
          }
        },
        when: function (answers) {
          return answers.includesFiles.includes('mobile')
        }
      },
      {
        type: 'list',
        message: `[单选] 选择PC端组件基本页面的布局`,
        name: 'layoutPc',
        suffix: 'suffix',
        choices: function (answers) {
          if (answers.includesFiles.includes('pc')) {
            let module = requireContext(
              global.config_path +
                '__CUSTOMCLICONFIG__/' +
                answers.frame +
                '/' +
                answers.includesFiles,
              false,
              /kht\.config\.js$/
            )

            let choices = []
            if (module.keys().length > 0) {
              module.keys().forEach(item => {
                choices = module(item)
              })
            } else {
              console.info(
                `\n  🧱 未检索到 【__CUSTOMCLICONFIG__/${answers.frame}/${answers.includesFiles}/index.js】的配置文件 ，请先创建并写入相关模板信息的配置文件！ \n`
              )
              process.exit(-1)
            }

            return choices.map(item => ({
              name: item.selectName,
              value: item.folderName
            }))
          }
        },
        when: function (answers) {
          return answers.includesFiles.includes('pc')
        }
      }
    ])
    .then(answers => {
      mkdirCatalogue(source, answers, destination)
    })
}

function mkdirCatalogue(source, answers, destination) {
  const selectPath = Object.keys(answers)
    .map(item => answers[item])
    .join('/')
  const framePath = resolve(
    __dirname,
    `${global.config_path}__CUSTOMCLICONFIG__/${selectPath}`
  )

  checkDirectory(
    framePath,
    resolve(VIEWPATH + (destination ? destination : '') + '/' + source),
    copyFolder
  )

  setTimeout(() => {
    console.log(
      `\n 🌱🌱 ${transform(
        '模块相关文件已创建完成，正确配置路由后及可查看生成后的页面'
      )}💖 \n`
    )
    process.exit(0)
  }, 800)
}

module.exports = (...args) => {
  return init(...args)
}
