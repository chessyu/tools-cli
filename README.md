## public-tools-cli
 通过 Node Cli 命令来生成并创建新的业务模块，包含页面的基础布局模版，通用路由模版，接口模版等，业务差异化组件需要自行添加与修改。用自动化来提升开发效率，目前已有**创建模块**，**创建模板文件**，**一键部署**，**初始化新项目** 等功能可用，更多功能还需要定制开发。

### 安装依赖 
- 全局安装 tools 工具 
```
npm install public-tools-cli -g

// 测试是否安装成功
tools -v 
```


- 项目中安装 tools 工具
```
npm install public-tools-cli -D

//安装完成后，在 package.json 中新增命令
  "scripts": {
    "tools":"tools"
  },

// 测试是否正常运行命令
npm run tools -v

```

- ![示例图]("https://github.com/chessyu/tools-cli/public/images/readme_1.png")

- ![示例图]("https://github.com/chessyu/tools-cli/public/images/readme_2.png")

### 如何使用方法

- 生成配置文件
运行命令 ` tools genconf` 可在当前目录中生成 **publicCliConfig**目录，包含了如下配置文件

└─publicCliConfig       // 目录
    │  apiConfig.js        // 创建模块中的 api 请求文件
    │  baseConf.js        // 根据项目实际情况配置文件生成的路径及初始化
    │  routerConfig.js  // 创建模块中的 路由 文件
    │  server.config.js // 配置 服务器 地址信息，用于自动部署
    │
    ├─mobile               
    │      default.js      // 创建模块中的文件 (单选一个文件)
    │      noquery.js
    │      panelList.js
    │
    └─pc
            defaultView.js  // 创建模块中的文件 (单选一个文件)

- ![示例图]("https://github.com/chessyu/tools-cli/public/images/readme_3.png")


### 已实现功能
 ***根据自定义的预设来生成文件***
 - 创建模块
 - 创建模板文件
 - 将 dist 包上传服务器
 - 始初化一个新项目
