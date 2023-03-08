const inquirer = require('inquirer')
const { run } = require('runjs')
const { resolve } = require('path')
const { NPM } = require(resolve('./__CUSTOMCLICONFIG__/baseConf.js'))

async function update(source) {
  inquirer
    .prompt([
      {
        type: 'checkbox',
        message: '[多选] 选择需要升级的内部组件库',
        name: 'library',
        choices: source
      }
    ])
    .then(answers => {
      answers.library.forEach(async item => {
        if (NPM == 'yarn') await run(`yarn upgrade ${item}`)
        if (NPM != 'yarn') await run(`${NPM} update ${item}`)
      })
    })
}

module.exports = (...args) => {
  return update(...args)
}
