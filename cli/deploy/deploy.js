const scpClient = require('scp2')
const ora = require('ora')
const chalk = require('chalk')
const { resolve } = require('path')
const { Client } = require('ssh2')
const conn = new Client()
const { transform } = require('../lib.js')

async function deploy(server, dir) {
  const connectConf = {
    host: server.host,
    port: server.port,
    username: server.username,
    password: server.password
  }
  // await conn.on('ready',() => {
  //   const spinner = ora(`正在将 ${dir} 目录下的所有文件覆盖式的发布到服务器( ${server.host}${server.path} 目录下)...`)
  //   conn.exec('rm -rf '+ server.path + '/' + '*' ,(err, stream) => {
  //     if(err){
  //       throw err;
  //     }
  //     stream.on('close', (code, signal) => {
  //       spinner.start()
  //       scpClient.scp(
  //         resolve('./' + dir),
  //         {
  //           ...connectConf,
  //           path: server.path
  //         },
  //         function (err) {
  //           spinner.stop()
  //           if (err) {
  //             console.log('🤢' + chalk.red('  Error: 发布失败 ' + err))
  //             throw err
  //           } else {
  //             console.log(
  //               chalk.green(
  //                 ` \n ✔ Success! 成功发布到开发服务器,访问地址：${server.host}:${
  //                   server.visitport
  //                 }/${server.path.split('/').pop()}/ \n `
  //               )
  //             )
  //           }
  //         }
  //       )
  //       conn.end();
  //     }).stdout.on('data', (data) => {
  //       console.log('STDOUT: ' + data);
  //     })
  //   })

  // }).connect(connectConf)

  const spinner = ora(
    `正在将 ${dir} 目录下的所有文件覆盖式的发布到服务器( ${server.host}${server.path} 目录下)...`
  )
  spinner.start()
  scpClient.scp(
    resolve('./' + dir),
    {
      ...connectConf,
      path: server.path
    },
    function (err) {
      spinner.stop()
      if (err) {
        console.log('🤢' + chalk.red('  Error: 发布失败 ' + err))
        throw err
      } else {
        console.log(
          chalk.green(
            ` \n ✔ Success! 成功发布到开发服务器,访问地址：${server.host}:${
              server.visitport
            }/${server.path.split('/').pop()}/ \n `
          )
        )

        if (!server.exec) process.exit(-1)
        if (Array.isArray(server.exec) && server.exec.length > 1) {
          let execSsh = ''
          let placeholder = []
          let trimArray = server.exec.map(item => {
            item = item.trim()
            if (item.includes('$/')) {
              item = item.replace(/\$/g, server.path + '').replace(/\s*/g, '')
              placeholder.push(true)
            } else {
              placeholder.push(false)
            }
            return item
          })
          execSsh = trimArray.join(' ')
          if (/rm -rf/.test(execSsh)) {
            console.log(
              '\n  😱😱😱' + chalk.red(' 兄die 你想删库跑路么? 劝你善良!!! ')
            )
            console.log(
              ' ',
              chalk.red('警告：') + transform(`已阻止执行命令 ${execSsh} `)
            )
            process.exit(-1)
          }
          if (!placeholder.includes(true)) {
            console.log(` \n 🤦‍♂️ 未找到全路径的占位符，不予执行命令：${execSsh}`)
            process.exit(-1)
          }
          conn
            .on('ready', () => {
              conn.exec(execSsh, (err, stream) => {
                if (err) {
                  throw err
                }
                stream
                  .on('close', (code, signal) => {
                    console.log(
                      '🍻' + transform(' 已成功执行命令： ' + execSsh)
                    )
                    conn.end()
                  })
                  .on('data', data => {
                    console.log(chalk.green('执行结果: ') + data)
                  })
                  .stderr.on('data', data => {
                    console.log(chalk.red('执行失败:') + data)
                  })
              })
            })
            .connect(connectConf)
        } else {
          console.log(
            ' ',
            chalk.red('Error：') +
              transform(`配置的命令格式不正确，未能正确的执行命令 `)
          )
        }
      }
    }
  )
}

module.exports = (...arg) => {
  return deploy(...arg)
}
