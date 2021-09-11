#!/usr/bin/env node
const program = require('commander');
const {version} = require('../package.json');
const path = require('path')
const fs = require('fs')
const { transform } = require('./lib.js')


let logo = `
,--^----------,--------,-----,-------^--,
| |||||||||   \`--------'     |          O
\`+---------------------------^----------|
  \`\\_,-------, _________________________|
    / XXXXXX /\`|     /
   / XXXXXX / \`\\    /
  / XXXXXX /\\______(
 / XXXXXX /
/ XXXXXX /
(________(      ☄ ❄ chessyu_vip@163.com ❅ ☼  
\`------'
当前版本: V ${ version }
`


program
    .version(transform(logo),'-v, --version', '查看当前版本号')
    .usage(transform('public-components-ui 工具集'))

program
.command('genconf')
.description('生成基础配置文件')
.action((source, destination) => {

const files = fs.readdirSync( path.resolve('./') ).filter(item => item == 'publicCliConfig')
if(files.length > 0){
console.info( `

✔ 当前目录下已存在【publicCliConfig】目录了，不需要重新生成！！！

` )
}else{
    require('./copyDir.js')(source, destination)
}
    
})

program
.command('init')
.description('初始化项目')
.argument('<project>', "项目名称")
.action((source, destination) => {
    require('./init.js')(source, destination)
})


program
.command('create')
.description('创建基础模块目录及文件')
.argument('<moduleName>', '模块名称')
.argument('[annotation]', '模块中文注解')
.action((source, destination) => {
    const files = fs.readdirSync( path.resolve('./') ).filter(item => item == 'publicCliConfig');
    if(files.length > 0){
        require('./create.js')(source, destination)
    }else{
    console.log(` 

    ☢ 请先生成基础配置文件 
    ✔ 运行 ${transform('tools genconf')} 
    
    `)
    }
    
});


program
.command('add')
.description('创建模版单文件')
.argument('<fileName>', '文件名称')
.action((source, destination) => {
    const files = fs.readdirSync( path.resolve('./') ).filter(item => item == 'publicCliConfig');
    if(files.length > 0){
        require('./add.js')(source, destination)
    }else{
    console.log(` 

    ☢ 请先生成基础配置文件 
    ✔ 运行 ${transform('tools genconf')}
    
    `)
    }
})

program
.command('deploy')
.description('将打包后 dist 目录内文件上传到 nginx 服务器')
.action((source, destination) => {
    const files = fs.readdirSync( path.resolve('./') ).filter(item => item == 'publicCliConfig');
    if(files.length > 0){
        require('./deploy/index.js')(source, destination)
    }else{
    console.log(` 

    ☢ 请先生成基础配置文件 
    ✔ 运行 ${transform('tools genconf')} 
    
    `)
    }
})



program.parse(process.argv);
