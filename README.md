# 前端脚手架

### 项目初心

通过 Node Cli 命令来生成并创建新的业务模块，包含页面的基础布局模版，通用模块模版，等或者即将使用 `umi` 相关的模块套件，业务差异化组件需要自行添加与修改。用自动化来提升开发效率，使更多的精力花费在技术的沉淀和业务上，有节省开发时间的牛逼想法欢迎大家一起贡献来打造效率工具 🍻🍻🍻

目前已有以下命令可用，更多功能还需要定制开发。

- [x] `init`初始化项目模板
- [x] `model`创建基础业务模块，
- [ ] `template`创建单页面模板，**此模板需要基于现有业务定制开发**
- [x] `empty` 创建空文件模块
- [x] `update` 升级组件库的版本
- [x] `deploy` 将 `dist` 目录里的所有文件上传到服务器
- [x] `genconf` 生成`node-cli`的配置文件及自定义的配置项
- [x] `interface` 基于数据结构生成 interface 接口
- [ ] `ui`低代码平台来拖拽组件来生成业务组件。**相关功能正在完善中**

### 安装前置依赖

由于 npm 包是放在私有云服务器上，安装前需要设置下镜像源地址，有两种方式设置，个人推荐使用第一种，方便管理和自由切换

1.  安装 **nrm** 镜像源管理工具

```bash
# 全局安装 nrm
npm install nrm -g

# 安装成功后可以查看所有的镜像源
nrm ls

# 新增自定义的镜像源地址, 公司私服地址
nrm add tools-service http://xxx.xxx.xxx.xxx:xxx/

# 使用自定义的镜像源，镜像源可自由切换
nrm use tools-service

```

2.  简单粗暴的设置镜像源

```bash

 npm set registry http://xxx.xxx.xxx.xxx:xxx/

```

### 配置完镜像源后安装 `Node-Cli` 工具

全局安装 tools 工具

```bash
  npm install public-tools-cli -g

  # 测试是否安装成功, 能正常输出图形就证明安装成功
  tools -v

```

![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_4.png)

### 正确使用命令姿势

安装完成命令后，可在全局任意目录下执行相应命令来得到输出结果。执行部分命令是有前置条件的，基于 `cmd` 当前进入的目录下必须有`__CUSTOMCLICONFIG__`的目录，此目录涵盖了基础的自定义配置
如：
**移动端页面模板** 模板目录`/__CUSTOMCLICONFIG__/自定义目录名/mobile`
**pc 端页面模板** 模板目录`/__CUSTOMCLICONFIG__/自定义目录名/pc`
**当前项目下命令基础配置** 文件放在 `__CUSTOMCLICONFIG__/baseConfig`

#### init

- 参数 project `string` : **必填项** 初始化后的项目名称
  基于已经开发好的项目模板直接拿来使用(比如目前的子应用项目)，此命令执行后有两组模式可以选择 **`系统内置方案组`** 和 **`本地自定义方案组`** ，两种模式仅为更加的通用灵活

  **系统内置方案组** 是公司内部需要使用到的项目，模板链接地址不可修改

  **本地自定义方案组** 可自定义配置第三方项目 git 地址，配置地址 `~/__CUSTOMCLICONFIG__/baseConf.js` `INIT`属性里

#### model

生成出前端意义上的文件模块， 执行命令后可选择生成 `移动端` 或 `PC 端`的模板文件

- 参数: moduleName `string` : **必填项** 创建的模块名称
- 参数: path `string` : **选填** 选择插入到指定目录

#### template

生成出单个模板文件，模板来自于 `/__CUSTOMCLICONFIG__/自定义目录名/mobile` 或 `/__CUSTOMCLICONFIG__/自定义目录名/pc`内的文件

- 参数 fileName `string` : **必填项** 创建的文件名称

#### empty

创建空文件模块，一般用于开发组件时，生成空文件的一个模块。省创建文件或目录的动作， 配置文件在 `__CUSTOMCLICONFIG__/baseConfig.js` 里的 `EMPTYMODEL`属性里进行配置，`类型 Array`

- 参数 moduleName `string` : **必填项** 模块目录命名 - 生成目录或文件规则需要配置选项到配置文件里

```
// 对于 * 的个数，代表着不同的处理方式，命令行输入的 moduleName
// 【** 占位符 - 代表自定义的取名值】， 【当 *** 个星是代表 首字母大写】， 【**** 个星是代表 全大写】
{
  name: 'react-ui 组件模块',   // 选项的名称。自定义
  value: 'react-ui', // 必须是唯一值
  checked: true, // 选项生成时，是否默认选中
  jsonConfig: {
    folder: ['./src/components/**', './src/components/**'],  // 路径下生成目录
    files: [ // 路径下生成文件
      './src/components/**/index.md',
      './src/components/**/index.ts',
    ]
  }
}
```

#### update

无参数
更新公司内部的组件库的版本

#### deploy

无参数 - 需要配置选项到配置文件里
将发布 dist 目录下的所有文件部署到服务器上，采用文件覆盖的方式,
`exec` 可配置，上传文件成功后，执行服务器的命令，多个命令时请配置执行 shell 脚本

```
{
  value: 'development', // 必须是唯一值
  name: '测试环境', //自定义名称, 选项名称
  visitport: '80', // 访问项目时的端口号。默认是 80 端口
  host: '10.XXX.6.XXXX', // 服务器的 ip 地址
  port: 22, // 登录服务器的端口
  username: 'root', // 登录服务器的 账号
  password: '*****', // 登录服务器的密码
  path: '/data/Plug-in-conf/html/XXX', // 【服务路径】项目静态文件存放地址
  exec: ['mdkir', "$/Test"]  // 配置文件上传后 执行的命令。比如启动 , 解压等。$/ 是必须，代表全路径的占位符
}
```

#### genconf

无参数
生成配置文件,在当前目录下生成 \***\*CUSTOMCLICONFIG\*\***目录，包含了如下配置文件

#### interface

无参数
将当前目录下的 `.json` 文件内容转化成 **interface** 接口的 `.ts` 文件。**值得注意的是，只接受 .json 文件，其它类型的文件直接忽略**

### 实战演练 🌰

**创建模块 tools model 命令** 是基于 Vue 项目进行，进入目录中

![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_5.png)

生成后的目录结构
![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_6.png)

**tools interface 命令**

![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_7.png)

![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_8.png)

![示例图](http://xxx.xxx.xxxx:9980/toolsong/base/tools-node-cli/-/raw/master/public/images/readme_9.png)
