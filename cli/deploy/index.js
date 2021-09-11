/*
 * @Description: 
 * @Author:  chessyu 
 * @Date: 2021-08-25 17:17:06
 */
const inquirer = require('inquirer');
const fs = require('fs');
const {resolve} = require('path');

async function upload(source,cmd){
    let config = [];
    inquirer
    .prompt([
        {
            type:'list',
            message:'请选择要部署的环境',
            name:'moduleType',
            choices:function(){

                config = require(resolve(__dirname,"../../publicCliConfig/server.config.js"));
                
                
                return config;
            },
        }
    ])
    .then(answers => {
        require('./deploy.js')(answers.moduleType, config.filter(item => item.value == answers.moduleType)[0]);
    });
}

module.exports = (...args)=>{
    return upload(...args)
}