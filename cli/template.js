/*
 * @Description:
 * @Author:  chessyu
 * @Date: 2021-08-13 16:58:02
 */
const inquirer = require('inquirer')
const fs = require('fs')
const { resolve, join } = require('path')
const { BASEPATH, APIPATH, ROUTERPATH, VIEWPATH } = require(resolve(
  global.config_path,
  '__CUSTOMCLICONFIG__/baseConf.js'
))
const { transform } = require('./lib.js')
const { exit } = require('process')
const chalk = require('chalk')

async function addFiles(source, cmd) {
  let filesConfig = []
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 选择放入的模块目录',
        name: 'modules',
        choices: function (answers) {
          return fs.readdirSync(resolve(VIEWPATH)).map((item, i) => {
            return {
              value: item,
              name: item,
              checked: i === 0
            }
          })
        }
      },
      {
        type: 'checkbox',
        message: '[多选] 选择模块包含的端',
        name: 'types',
        choices: [
          { value: 'mobile', name: '移动端', checked: true },
          { value: 'pc', name: 'pc端' }
        ]
      },
      {
        type: 'list',
        message: '[单选] 选择模版文件',
        name: 'files',
        choices: function (answers) {
          if (answers.types.length === 0) {
            console.log(`\n  🤦‍♂️${chalk.red('未选择任何模块 ')} \n`)
            exit(1)
          }

          if (answers.types.includes('mobile')) {
            let mobileFilePath = resolve(
              global.config_path,
              '/__CUSTOMCLICONFIG__/mobile'
            )
            let data = fs.readdirSync(mobileFilePath)

            filesConfig = filesConfig.concat(
              data.map(item => {
                return require(join(mobileFilePath, '/' + item))
              })
            )
          }

          if (answers.types.includes('pc')) {
            let PcFilePath = resolve(
              global.config_path,
              '/__CUSTOMCLICONFIG__/pc'
            )
            let pcData = fs.readdirSync(PcFilePath)

            filesConfig = filesConfig.concat(
              pcData.map(item => {
                return require(join(PcFilePath, '/' + item))
              })
            )
          }

          return filesConfig.map(keys => {
            return {
              value: keys.templateParams.type,
              name: keys.templateParams.description,
              env: keys.templateParams.env
            }
          })
        }
      }
    ])
    .then(answers => {
      let select = filesConfig.filter(
        item => item.templateParams.type == answers.files
      )
      touchFiles(source, answers, select[0])
    })
}

function touchFiles(source, answers, filesConfig) {
  let duplicationName = fs.readdirSync(join(VIEWPATH, '/' + answers.modules))
  if (duplicationName.includes(source + '.vue')) {
    console.log(
      `\n  ❌${chalk.red('当前目录下已存在 ' + source + '.vue 文件')} \n`
    )
    exit(1)
  }

  const tfFileName =
    answers.modules.substring(0, 1).toUpperCase() + answers.modules.substring(1) //首字母转大写

  fs.writeFileSync(
    join(VIEWPATH, '/' + answers.modules + '/', source + '.vue'),
    filesConfig.template
  )

  fs.readFile(
    join(ROUTERPATH, '/' + tfFileName + '.js'),
    'utf8',
    (err, data) => {
      if (err) throw err
      var router = data.replace(
        '];',
        `
        {
            path: "/${source}View",
            name: "${source}View",
            meta: {
                title: "",
                keepAlive: true,
            },
            component: () =>
                import(/* webpackChunkName: "${source}" */ "../views/${answers.modules}/${source}.vue"),
        },
      ];`
      )
      fs.writeFileSync(join(ROUTERPATH, '/' + tfFileName + '.js'), router)
    }
  )

  setTimeout(() => {
    console.log(`
            文件已创建完成，${chalk.yellow('路由记得在 index.js 内引入')} ^_^ 💖
            已创建文件：
            ${transform(join(VIEWPATH, '/' + source + '.vue'))}
            ${transform(join(ROUTERPATH, '/' + answers.modules + '.js'))}
        `)
    process.exit(0)
  }, 800)
}

module.exports = (...arg) => addFiles(...arg)
