/*
 * @Description: 
 * @Author:  chessyu 
 * @Date: 2021-08-13 16:58:02
 */
const inquirer = require('inquirer');
const fs = require('fs')
const { resolve,join } = require('path')
const { BASEPATH, APIPATH, ROUTERPATH, VIEWPATH } = require('./publicCliConfig/baseConf.js')
const { transform } = require('./lib.js');
const { exit } = require('process');
const chalk = require('chalk');

async function addFiles(source,cmd){
    let filesConfig = [];
    inquirer
    .prompt([
        {
            type:'list',
            message:'选择放入的模块目录',
            name:'modules',
            choices:function(answers){
                return fs.readdirSync(resolve(VIEWPATH))
                .map((item,i) => {
                    return {
                        value:item,
                        name:item,
                        checked: i === 0
                    }
                });
            }
        },
        {
            type:'list', 
            message: '选择模版文件',
            name:'files',
            choices:function(answers){
                let mobileFilePath = resolve("./publicCliConfig/mobile")
                let data = fs.readdirSync(mobileFilePath);

                filesConfig = filesConfig.concat(data.map(item => {
                    return require( join(mobileFilePath,'/'+ item))
                }))

                let PcFilePath = resolve("./publicCliConfig/pc")
                let pcData = fs.readdirSync(PcFilePath);

                filesConfig = filesConfig.concat(pcData.map(item => {
                    return require( join(PcFilePath,'/'+ item))
                }))

                return filesConfig.map(keys => {
                    return {
                        value: keys.templateParams.type,
                        name: keys.templateParams.description
                    }
                })
            }
        }
    ])
    .then(answers => {
        let select = filesConfig.filter(item => item.templateParams.type == answers.files)
        touchFiles(source,answers,select[0])
    })
}

function touchFiles(source,answers,filesConfig){
    let duplicationName = fs.readdirSync( join(VIEWPATH,'/'+ answers.modules) )
    if(duplicationName.includes(source +'.vue')){
    console.log(`
    
    ❌  ${chalk.red('当前目录下已存在 ' +source +'.vue 文件')}
    
    `)
        exit(1);
    }
   

    const tfFileName = answers.modules.substring(0,1).toUpperCase() + answers.modules.substring(1)  //首字母转大写

    fs.writeFileSync( join(VIEWPATH,'/'+ answers.modules +'/',source +'.vue'),filesConfig.template);
    
    fs.readFile( join(ROUTERPATH,'/' + tfFileName + '.js'),'utf8', (err, data)=>{
        if (err) throw err;
        var router = data.replace('];',`
        {
            path: "/${source}",
            name: "${source}",
            meta: {
                title: "",
                keepAlive: true,
            },
            component: () =>
                import(
                /* webpackChunkName: "${source}" */ "../views/${answers.modules}/${source}.vue"
                ),
        },
        ];`)
        fs.writeFileSync(  join(ROUTERPATH,'/' + tfFileName + '.js' ),router);
    });
    

    setTimeout(()=>{
        console.log(`
            文件已创建完成，${chalk.yellow('路由记得在 index.js 内引入') } ^_^ 💖
            已创建文件：
            ${ transform(join(VIEWPATH,'/'+ source +'.vue')) }
            ${ transform(join(ROUTERPATH,'/'+ answers.modules + '.js')) }
        `);
        process.exit(0);
    },800)
}

module.exports = (...arg) => addFiles(...arg)