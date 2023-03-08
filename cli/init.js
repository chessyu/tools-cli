const { resolve, join } = require('path')
const inquirer = require('inquirer')
const ora = require('ora')
const { run } = require('runjs')
const shell = require('shelljs')
const chalk = require('chalk')
const { exit } = require('process')
const { transform } = require('./lib.js')

let CUSTOMDATA = []
let INITDATA = []
let NPMDATA = ''
let HASCONFIG = true

try {
  let { CUSTOM } = require(resolve(
    global.config_path,
    '__SYSTEMCLICONFIG__/baseConf.js'
  ))
  CUSTOMDATA = CUSTOM

  let { INIT, NPM } = require(resolve(
    global.config_path,
    '__CUSTOMCLICONFIG__/baseConf.js'
  ))
  INITDATA = INIT
  NPMDATA = NPM
} catch (err) {
  let { CUSTOM } = require(join(
    __dirname,
    '.',
    '/__SYSTEMCLICONFIG__/baseConf.js'
  ))
  CUSTOMDATA = CUSTOM

  let { INIT, NPM } = require(join(
    __dirname,
    '.',
    '/__CUSTOMCLICONFIG__/baseConf.js'
  ))
  INITDATA = INIT
  NPMDATA = NPM
  HASCONFIG = false
}

function initProject(cmd) {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 选择使用组内方案',
        name: 'confType',
        choices: function () {
          let array = [
            { value: 'builtin', name: '系统内置方案组', checked: true }
          ]
          if (HASCONFIG)
            array.push({ value: 'custom', name: '本地自定义方案组' })
          return array
        },
        prefix: 'prefix'
      },
      {
        type: 'list',
        message: '[单选] 从<内置组>内选取初始化项目类型',
        name: 'builtinType',
        choices: function () {
          return CUSTOMDATA
        },
        when: function (answers) {
          return answers.confType.includes('builtin')
        }
      },
      {
        type: 'list',
        message: '[单选] 从<自定义组>内选取初始化项目类型',
        name: 'initType',
        choices: function () {
          return INITDATA
        },
        when: function (answers) {
          return answers.confType.includes('custom')
        }
      }
    ])
    .then(async answers => {
      let select
      if (answers.confType == 'builtin') {
        select = CUSTOMDATA.filter(item => item.value == answers.builtinType)[0]
      }
      if (answers.confType == 'custom') {
        select = INITDATA.filter(item => item.value == answers.initType)[0]
      }
      if (select.git) {
        const spinner = ora(`✨  正在初始化  ${select.remarks} 项目.... `)
        spinner.start()
        try {
          await run(`git clone ${select.git} ${cmd}`)
          shell.cd(`${cmd}`)
          shell.rm('-rf', '.git')
          shell.exec('git init')
          await formatProject()
          if (NPMDATA == 'yarn') await run(`yarn`)
          if (NPMDATA != 'yarn') await run(`${NPMDATA} install`)
          console.log(`\n 🌱🌱 ${transform('cd ' + cmd + '')}  \n`)
          console.log(
            `\n 🌱🌱 ${transform(
              '.git 目录已重置, 记得关联 git 仓库, 命令: git remote add origin git地址 '
            )}\n`
          )
        } catch (err) {
          console.log(chalk.red(err))
          exit(1)
        }
        spinner.stop()
      } else {
        console.log(
          chalk.green(`  ❌ ${select.remarks} 未配置 git 的地址或网络`)
        )
      }
    })
}

function formatProject() {}

module.exports = (...arg) => initProject(...arg)
