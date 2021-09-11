/*
 * @Description: 
 * @Author:  chessyu 
 * @Date: 2021-08-06 14:35:42
 */
const inquirer = require('inquirer');
const fs = require('fs')
const { resolve,join } = require('path')
const {run} = require('runjs')
const { transform } = require('./lib.js')

const { BASEPATH, APIPATH, ROUTERPATH, VIEWPATH } = require('./publicCliConfig/baseConf.js')

async function init(source,cmd){
    let mobileConfig = [];
    let pcConfig = [];

    inquirer
    .prompt([
        {
            type:'checkbox',
            message:'选择模块包含的端',
            name:'includesFiles',
            choices:[{ value:'mobile',name:'移动端', checked:true},{ value:'pc',name:'pc端'}],
            prefix: "prefix"
        },
        
        {
            type:'list',
            message:`选择移动端组件基本页面的布局`,
            name:'layoutMobile',
            suffix: "suffix",
            choices:function(answers){
                
                if(answers.includesFiles.includes('mobile')){
                    let mobileFilePath = resolve("./publicCliConfig/mobile")
                    let data = fs.readdirSync(mobileFilePath);
                    mobileConfig = data.map(item => {
                        return require( join(mobileFilePath,'/'+ item))
                    })

                    return mobileConfig.map(keys => {
                        return {
                            value: keys.templateParams.type,
                            name: keys.templateParams.description
                        }
                    })
                }
                
            },
            when:function(answers){
                return answers.includesFiles.includes('mobile');
            }
        },
        {
            type:'list',
            message:`选择PC端组件基本页面的布局`,
            name:'layoutPc',
            suffix: "suffix",
            choices:function(answers){

                if(answers.includesFiles.includes('pc')){
                    let PcFilePath = resolve("./publicCliConfig/pc")
                    let data = fs.readdirSync(PcFilePath);
                    pcConfig = data.map(item => {
                        return require( join(PcFilePath,'/'+ item))
                    })

                    return pcConfig.map(keys => {
                        return {
                            value: keys.templateParams.type,
                            name: keys.templateParams.description
                        }
                    })
                }

            },
            when:function(answers){
                return answers.includesFiles.includes('pc');
            }
        },

    ])
    .then(answers => {
        let mobileSelect = mobileConfig.filter( item => item.templateParams.type == answers.layoutMobile)
        let pcSelect = pcConfig.filter(item => item.templateParams.type == answers.layoutPc)
        mkdirCatalogue(source,answers,mobileSelect[0],pcSelect[0],cmd);
    });
}

function mkdirCatalogue(source,answers,mobileConfig,pcConfig,cmd){
    const tfFileName = source.substring(0,1).toUpperCase() + source.substring(1)  //首字母转大写
    let listApiPath = join(APIPATH ,'/', source);
    let listViewsPath = join(VIEWPATH ,'/', source);
    let listRouterPath = join(ROUTERPATH)
    run(`mkdir  ${listApiPath}`);
    run(`mkdir  ${listViewsPath}`);
    const files = fs.readdirSync( resolve(BASEPATH) ).filter(item => item == 'router')
    if(files.length == 0){
        run(`mkdir  ${listRouterPath}`);
    }

    let filesPath = resolve("./publicCliConfig");
    let api = require( join(filesPath,'/apiConfig.js'))(source,cmd)
    let router = require( join(filesPath,'/routerConfig.js'))(source,cmd,answers.includesFiles.includes('pc'))
    

    if(answers.includesFiles.includes('mobile')) fs.writeFileSync( join(listViewsPath,'/mobileView.vue'),mobileConfig.template); // 移动端的页面模版。
    if(answers.includesFiles.includes('pc')) fs.writeFileSync( join(listViewsPath,'/pcView.vue'),pcConfig.template); // PC 端的页面模版
    fs.writeFileSync( join(listViewsPath,'/index.less'),''); // 模块内公共样式


    fs.writeFileSync(join(listApiPath,`/index.js`), api);
    fs.writeFileSync(join(listRouterPath,`/${tfFileName}.js`), router);

    setTimeout(()=>{
    console.log(`
    模块相关文件已创建完成，路由记得在 index.js 内引入 ^_^ 💖
    已创建文件: 
    ${transform('\\'+ listViewsPath +'\\*.vue')}
    ${transform('\\'+ listViewsPath +'\\*.less')}
    ${transform('\\'+ listApiPath +'\\*.js')}
    ${transform("\\" + join(ROUTERPATH ,'/', tfFileName + '.js') +"")}
    `);
    process.exit(0);
    },800)
}

module.exports = (...args) =>{
    return init(...args)
}