
const scpClient = require("scp2");
const ora = require('ora');
const chalk = require('chalk')
const {resolve} = require('path')

async function deploy(cmd,server){
    
    const spinner = ora('正在发布到开发服务器('+ server.host +')...')
    spinner.start();

    scpClient.scp(resolve(__dirname,"../../dist/"),{
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        path: server.path + '/'+cmd
    },function(err){
        spinner.stop();
        if(err){
            console.log(chalk.red('Error: 发布失败\n'+ err));
            throw err;
        }else{
            console.log(chalk.green(`Success! 成功发布到开发服务器,访问地址：${server.host}:${server.visitport}/${cmd}`))
        }
    });
}

module.exports = (cmd) => {
    return deploy(cmd)
}