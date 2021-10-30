module.exports = {
    BASEPATH: './src',     //项目的基础目录
    APIPATH: './src/api',  //接口文件存放的目录 
    ROUTERPATH: './src/router',   //路由文件存放的目录
    VIEWPATH: './src/views',   //页面存放的目录 

    INIT:[
        {
            name: 'H5模板 --- Vue全家桶 + elementUI + mand mobile',
            value: 'h5vue',
            git: 'https://github.com/chessyu/template-H5.git',
            checked: true      //默认选中
        },
        {
            name: '后台管理系统模板 ---Vite + Vue3 + TypeScript + Ant-design-vue + I18n',
            value: 'adminSystem',
            git: 'https://github.com/anncwb/vue-vben-admin.git',
            cchecked:false
        },
        
    ]
}