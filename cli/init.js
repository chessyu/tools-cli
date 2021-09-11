
const { INIT } = require('./publicCliConfig/baseConf.js');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {run} = require('runjs');


function initProject (cmd){
    
    inquirer
    .prompt([
        {
            type:'list',
            message:'选择要初始化项目类型',
            name:'initType',
            choices: INIT
        }
    ])
    .then(async answers => {
        let select = INIT.filter(item => item.value == answers.initType)[0];
        console.log(`✨  正在 clone  ${ select.name } 模板.... `)

        if(select.name){
            try{
                await run(`git clone ${select.git} ${cmd}`);

                run(`cd ${cmd}`);
                run('yarn')
            }
            catch(err){
                console.log(chalk.red(err));
                exit(1)
            }
            
        }else{
            console.log( chalk.green('❌   未配置克隆 git 的地址') )
        }
    })
}

module.exports = (...arg) => initProject(...arg)