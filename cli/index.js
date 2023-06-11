#!/usr/bin/env node
const program = require('commander')
const { version, dependencies, devDependencies } = require('../package.json')
const path = require('path')
const { PACKAGE } = require(path.join(
  __dirname,
  '.',
  '/__SYSTEMCLICONFIG__/baseConf.js'
))

const fs = require('fs')
const { transform, deepFindFolder, checkFolder } = require('./lib.js')
const { run } = require('runjs')

let logo_0 = `
,--^----------,--------,-----,-------^--,
| |||||||||   \`--------'     |          O
\`+---------------------------^----------|
  \`\\_,-------, _________________________|
    / XXXXXX /\`|     /
   / XXXXXX / \`\\    /
  / XXXXXX /\\______(
 / XXXXXX /
/ XXXXXX /
(________(      
\`------'
☄ ❄  前端开发脚手架 version: ${version}  ❅ ☼  
`

program
  .version(transform(logo_0), '-v, --version', '查看当前版本号')
  .usage(transform('前端开发脚手架'))

// program
//   .command('ui')
//   .description('可视化低代码平台')
//   .option('-p, --port <port>', '配置启动端口 (默认端口 8087)')
//   .action((source, description) => {
//     require('./ui.js')(source, description)
// console.log(path.resolve("./"))
// run('npm run ui');
// })

program
  .command('init')
  .description('初始化模板项目')
  .argument('<project>', '项目名称')
  .action((source, destination) => {
    require('./init.js')(source, destination)
  })

program
  .command('model')
  .description('创建基础业务模块目录')
  .argument('<moduleName>', '定义模块名称')
  .argument('[path]', '插入到某目录下')
  .action((source, destination) => {
    deepFindFolder('__CUSTOMCLICONFIG__')
    require('./model.js')(source, destination)
  })

program
  .command('template')
  .description('创建模版单文件')
  .argument('<fileName>', '定义文件名称')
  .action((source, destination) => {
    deepFindFolder('__CUSTOMCLICONFIG__')
    console.log(
      `\n  功能正在设计开发中 \n  🐶🐶🐶 ${transform('请耐心等待...')}  \n`
    )
    // require('./template.js')(source, destination)
  })

program
  .command('empty')
  .description('创建空文件模块')
  .argument('<moduleName>', '定义模块名称')
  .action((source, destination) => {
    deepFindFolder('__CUSTOMCLICONFIG__')
    require('./empty.js')(source, destination)
  })

program
  .command('interface')
  .description('将 JSON 转化成 interface 接口')
  .action((source, destination) => {
    if (
      !fs
        .readdirSync(path.resolve('./'))
        .filter(item => item.split('.').includes('json')).length
    ) {
      console.log(
        `\n  ${transform(
          '当前目录下未找到 .json 文件, 请检查当前访问路径是否正确 '
        )} 🍻 \n`
      )
    }
    require('./interface.js')(source, destination)
  })

program
  .command('update')
  .description('更新内部公共组件库')
  .action(() => {
    let depe = Object.assign(dependencies, devDependencies)
    let hasPackage = []
    PACKAGE.forEach(item => {
      if (depe[item.name]) {
        hasPackage.push(item)
      }
    })
    if (hasPackage.length == 0)
      console.log(`\n  ${transform('👀 未安装任何内部公共组件库')}\n`)
    if (hasPackage.length > 0) require('./update')(hasPackage)
  })

program
  .command('deploy')
  .description('将 dist 目录内所有文件上传到 nginx 服务器')
  .action((source, destination) => {
    deepFindFolder('__CUSTOMCLICONFIG__')
    require('./deploy/index.js')(source, destination)
  })

program
  .command('genconf')
  .description('生成基础配置文件')
  .action((source, destination) => {
    const hasFiles = checkFolder('./', '__CUSTOMCLICONFIG__')

    if (hasFiles) {
      console.info(
        `\n  ✔ 当前目录下已存在【__CUSTOMCLICONFIG__】目录了，不需要重新生成！！！ \n`
      )
    } else {
      require('./copyDir.js')(source, destination)
    }
  })

program.parse(process.argv)
