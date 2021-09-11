/*
 * @Description: 路由配置文件
 * @Author:  chessyu
 * @Date: 2021-08-09 10:35:06
 */

function routerDefaultConf(moduleName, cmd, hasPc) {
  return `
    /*
    * @Description:  ${cmd}模块路由
    * @Author:  your name 
    * @Date: ${new Date().toLocaleDateString()}
    */
    const routes = [
        ${addPcRouter(moduleName, cmd, hasPc)}
        {
            path: "/${moduleName}MobileView",
            name: "${moduleName}MobileView",
            meta: {
                title: "${cmd}",  
                keepAlive: true,
            },
            component: () => import( /* webpackChunkName: "${moduleName}MobileView" */  "../views/${moduleName}/mobileView.vue"),
        },
    ]

    export default routes;
    `;
}

function addPcRouter(moduleName, cmd, hasPc) {
  let src = "";
  if (hasPc) {
    src = `
        {
            path: "/${moduleName}PcView",
            name: "${moduleName}PcView",
            meta: {
                title: "${cmd}",  
                keepAlive: true,
            },
            component: () => import( /* webpackChunkName: "${moduleName}PcView" */  "../views/${moduleName}/PcView.vue"),
        },
        `;
  }
  return src;
}

module.exports = (...args) => routerDefaultConf(...args);
