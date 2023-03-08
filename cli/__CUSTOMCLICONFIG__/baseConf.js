module.exports = {
  BASEPATH: './src', //项目的基础目录
  VIEWPATH: './src/pages', //页面存放的目录
  NPM: 'yarn', // 使用包管理器，默认使用 npm , 可选 cnpm, yarn, pnpm 等

  INIT: [
    // init 初始化项目模板
    {
      remarks: 'H5项目模板 - Vue',
      name: 'H5模板 --- Vue全家桶 + elementUI + mand mobile',
      value: 'h5vue',
      git: 'https://github.com/chessyu/template-H5.git',
      checked: true //默认选中
    },
    {
      remarks: 'PC端项目模板 - Vue',
      name: '后台管理系统模板 --- Vite + Vue3 + TypeScript + Ant-design-vue + I18n',
      value: 'adminSystem',
      git: 'https://github.com/anncwb/vue-vben-admin.git',
      checked: false
    }
  ],

  EMPTYMODEL: [
    // empty 生成空文件模块 配置
    // 对于 * 的个数，代表着不同的处理方式
    // 【** 占位符 - 代表自定义的取名值】， 【当 *** 个星是代表 首字母大写】， 【**** 个星是代表 全大写】
    {
      name: 'coustomer-vue-ui 组件模块', // 选项的名称。自定义
      value: 'coustomer-vue-ui', // 必须是唯一值
      checked: true, // 选项生成时，是否默认选中
      jsonConfig: {
        folder: ['./src/**/docs', './src/**/example'], // 路径下生成目录
        files: [
          // 路径下生成文件
          './src/**/docs/zh-CN.md',
          './src/**/example/index.vue',
          './src/**/index.ts',
          './src/**/**.vue',
          './src/**/***.less'
        ]
      }
    },
    {
      name: 'coustomer-react-ui 组件模块',
      value: 'coustomer-react-ui',
      checked: true,
      jsonConfig: {
        folder: ['./src/components/**', './src/components/**'], // 【** 占位符 - 代表自定义的取名值】， 【当 *** 个星是代表 首字母大写】， 【**** 个星是代表 全大写】
        files: ['./src/components/**/index.md', './src/components/**/index.ts']
      }
    }
  ],

  SERVER_LIST: [
    // deploy 自动部署服务 配置
    {
      value: 'development', // 必须是唯一值
      name: '开发环境', //自定义名称
      visitport: '80', // 访问项目时的端口号。默认是 80 端口
      host: '10.XXX.6.XXXX', // 服务器的 ip 地址
      port: 22, // 登录服务器的端口
      username: 'root', // 登录服务器的 账号
      password: '*****', // 登录服务器的密码
      path: '/data/Plug-web/retail-resources/html', // 【服务路径】项目静态文件存放地址
      exec: ['mdkir', '$/Test'] // 配置文件上传后 执行的命令。比如启动 , 解压等。$/ 是必须，代表全路径的占位符
    },
    {
      value: 'test',
      name: '测试环境',
      visitport: '80',
      host: '120*******',
      port: 22,
      username: 'root',
      password: '********',
      path: '/project_data/data'
    }
  ]
}
