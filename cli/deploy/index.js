/*
 * @Description:
 * @Author:  chessyu
 * @Date: 2021-08-25 17:17:06
 */
const inquirer = require('inquirer')
const fs = require('fs')
const { resolve } = require('path')

async function upload(source, cmd) {
  let config = []
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 请选择要部署的环境',
        name: 'moduleType',
        choices: function () {
          config = require(resolve(
            global.config_path,
            '__CUSTOMCLICONFIG__/baseConf.js'
          ))
          config = config.SERVER_LIST
          return config
        }
      },
      {
        type: 'list',
        message: '[单选] 请选择要部署的目录',
        name: 'dirName',
        choices: function () {
          let dir = fs.readdirSync(resolve('./')).filter((item, i) => {
            let ignoer = ['__CUSTOMCLICONFIG__', 'node_modules']
            let contain = ['zip', '7z', 'rar', 'arj', 'gzip', 'jar', 'gz']
            if (
              (fs.lstatSync(resolve('./' + item)).isDirectory() &&
                !ignoer.includes(item)) ||
              (item.split('.').length > 1 &&
                contain.includes(item.split('.').pop().toLocaleLowerCase()))
            ) {
              return true
            }
          })
          return dir.map((item, i) => {
            return {
              value: item,
              name: item,
              checked: i === 0
            }
          })
        }
      }
    ])
    .then(answers => {
      require('./deploy.js')(
        config.filter(item => item.value == answers.moduleType)[0],
        answers.dirName
      )
    })
}

module.exports = (...args) => {
  return upload(...args)
}
