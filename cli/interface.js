const json2ts = require('json2ts')
const inquirer = require('inquirer')
const fs = require('fs')
const { resolve, join } = require('path')
const { transform } = require('./lib.js')

function toInterface(source, cmd) {
  let escaping = []
  inquirer
    .prompt([
      {
        type: 'list',
        message: '[单选] 选择需要转成 interface 的文件',
        name: 'modules',
        choices: function (answers) {
          let ignoer = ['package.json', 'package-lock.json', 'tsconfig.json']
          escaping = fs
            .readdirSync(resolve('./'))
            .map((item, i) => {
              return {
                value: item,
                name: item
              }
            })
            .filter(
              item =>
                !ignoer.includes(item.value) &&
                item.value.split('.').includes('json')
            )
          escaping.push({
            value: 'all',
            name: '全部文件'
          })
          return escaping
        }
      }
    ])
    .then(answers => {
      touchFiles(answers.modules)
    })

  // let result = json2ts.convert();
  function touchFiles(select) {
    if (select == 'all') {
      escaping.pop()
      escaping.forEach(item => {
        let filesPath = item.value.split('.')
        filesPath.pop()
        fs.writeFileSync(
          resolve('./' + filesPath.join('.') + '.ts'),
          json2ts.convert(fs.readFileSync(resolve('./', item.value)))
        )
        fs.rm(resolve('./', item.value), () => {
          console.log(
            `\n  ${transform(
              ' JSON 转义成功：/' + filesPath.join('.') + '.ts'
            )} \n`
          )
        })
      })
      return false
    }
    let selectModules = escaping.filter(item => item.value == select)[0]
    let selectFilesPath = selectModules.value.split('.')
    selectFilesPath.pop()
    fs.writeFileSync(
      resolve('./' + selectFilesPath.join('.') + '.ts'),
      json2ts.convert(fs.readFileSync(resolve('./', selectModules.value)))
    )
    fs.rm(resolve('./', selectModules.value), () => {
      console.log(
        `\n ${transform(
          ' JSON 转义成功：/' + selectFilesPath.join('.') + '.ts'
        )} \n`
      )
    })
  }
}

module.exports = (...arg) => {
  return toInterface(...arg)
}
