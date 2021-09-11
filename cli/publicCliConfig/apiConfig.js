/*
 * @Description: 接口配置文件
 * @Author:  chessyu
 * @Date: 2021-08-09 10:34:51
 */

function apiDefaultConf(moduleName, cmd) {
  return `
    /*
    * @Description: ${cmd}接口配置文件
    * @Author:  your name 
    * @Date: ${new Date().toLocaleDateString()}
    */
    import request from "@/utils/require.js";
    import { envInterface } from '@/utils/help.js'
    import qs from 'qs'

    // 解构接口模块
    let { gms,env } = envInterface();
    let bill = ''
    // 域名后缀
    if(env){
        bill = gms + 'belle.gms.app.transport';  //测试环境或生产环境的中台接口全路径；
    }else{
        bill=  '/gms/tpas/app/xxxxx/gms.ig'   //开发环境调用 gms 测试接口
    }

    export const get${moduleName} = (data) =>
        request({
            url: bill ,
            method:"post",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
            },
            data:qs.stringify(data)
        })
    `;
}

module.exports = (...arg) => {
  return apiDefaultConf(...arg);
};
