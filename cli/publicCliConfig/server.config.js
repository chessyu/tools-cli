/*
 * @Description: 
 * @Author:  chessyu 
 * @Date: 2021-08-25 17:17:06
 */
/**
 * 服务器相关配置
 */

const SERVER_LIST = [
    {
      value: 'development',
      name: '测试环境',
      visitport:'1024',
      host: '10.XXX.6.XXXX', // ip
      port: 22, // 端口
      username: 'root',
      password: '*****',
      path: '/data/retail/retail-resources/gqa' // 项目静态文件存放地址
    },
    {
      value: 'prodction',
      name: '正式环境',
      visitport:'1024',
      host: '120*******',
      port: 22,
      username: 'root',
      password: '********',
      path: '/project_data/belle'
    }
  ];
  module.exports = SERVER_LIST;