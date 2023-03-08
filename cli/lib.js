/*
 * @Author: yjq
 * @Date: 2022-02-16 14:06:30
 * @LastEditors: [you name]
 * @LastEditTime: 2022-02-16 15:59:17
 * @Description:
 */
const Printer = require('@darkobits/lolcatjs')
const chalk = require('chalk')
const fs = require('fs')
const { resolve } = require('path')

/**
 * 生成文字渐变方法
 * @param {*} str
 * @returns
 */
function transform(str) {
  return Printer.fromString(str)
}

/**
 * 随机生成 0-n 内的整数
 */
function randomInt(num) {
  return Math.floor(Math.random() * num)
}

/**
 * 生成文字颜色文案
 * @param {*} type 可选参数 green , red, blue, yellow
 * @param {*} str
 */
function useGreenChalk(str, type = 'green') {
  switch (type) {
    case 'green':
      console.log(chalk.green(str))
      break
    case 'red':
      console.log(chalk.red(str))
      break
    case 'blue':
      console.log(chalk.blue(str))
      break
    case 'yellow':
      console.log(chalk.yellow(str))
      break
  }
}

/**
 * 判断路径下是否有此目录名
 * @param {*} folderName
 * @return boolean
 */
function checkFolder(path, folderName) {
  return fs.readdirSync(resolve(path)).includes(folderName)
}

/**
 * 查看路径下所有的目录名，或文件名
 * @param {*} folderName
 * @return Array
 */
function getFilesName(path) {
  return fs.readdirSync(resolve(path))
}

/**
 * 首字母转大写
 * @param {*} str
 * @returns
 */
function titleCase(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1)
}

/** 读取文件夹内的文件 */
const readDirSync = dirPath => {
  const result = [],
    dirs = []
  const files = fs.readdirSync(dirPath)
  files.forEach(file => {
    const stat = fs.statSync(resolve(dirPath, file))
    stat.isDirectory() ? dirs.push(file) : result.push(resolve(dirPath, file))
  })
  dirs.forEach(dir => result.push(...readDirSync(resolve(dirPath, dir))))
  return result
}

/** 批量读取文件夹内的指定文件 */
const requireContext = (dirPath, deep = false, reg) => {
  dirPath = resolve(process.cwd(), dirPath)

  let files = deep
    ? readDirSync(dirPath)
    : fs
        .readdirSync(dirPath)
        .filter(file => !fs.statSync(resolve(dirPath, file)).isDirectory())

  if (reg instanceof RegExp) {
    files = files.filter(file => reg.test(file))
  }

  const context = file => require(file)
  context.keys = () => files.map(file => resolve(dirPath, file))

  return context
}

/**
 * 复制整个目录文件
 * @param {*} src
 * @param {*} dst
 */
const copyFolder = function (src, dst) {
  let paths = fs.readdirSync(src) //同步读取当前目录
  paths.forEach(function (path) {
    var _src = src + '/' + path
    var _dst = dst + '/' + path
    fs.stat(_src, function (err, stats) {
      //stats  该对象 包含文件属性
      if (err) throw err
      if (stats.isFile()) {
        //如果是个文件则拷贝
        let readable = fs.createReadStream(_src) //创建读取流
        let writable = fs.createWriteStream(_dst) //创建写入流
        readable.pipe(writable)
      } else if (stats.isDirectory()) {
        //是目录则 递归
        checkDirectory(_src, _dst, copyFolder)
      }
    })
  })
}

/** 判断当是否是目录 */
const checkDirectory = function (src, dst, callback) {
  fs.access(dst, fs.constants.F_OK, err => {
    if (err) {
      fs.mkdirSync(dst)
      callback(src, dst)
    } else {
      callback(src, dst)
    }
  })
}

/** 向上递归查找指定目录 */
const deepFindFolder = function (folderName) {
  if (checkFolder('./', folderName)) {
    global.config_path = './'
    return './'
  }
  let deepPath = '../'
  let hasDeep = true
  while (hasDeep) {
    let currentDisk = resolve(deepPath)
    if (currentDisk == '/' || currentDisk.split(':')[1] == '\\') {
      console.log(
        `\n  ${
          currentDisk == '/'
            ? '当前磁盘路径下'
            : currentDisk[0] + '磁盘路径下: '
        }未找到【${folderName}】目录 \n\n  请在需要的目录下生成配置文件 \n  ✔ 运行 ${transform(
          'kht genconf'
        )} 命令 \n`
      )
      process.exit(-1)
      // return {
      //   diskName: currentDisk[0],
      //   hasFolder: false,
      //   massage: `${currentDisk == '/' ? '当前磁盘内' : currentDisk[0] +'磁盘内: ' }未找到【${folderName}】目录`
      // }
    }
    let flage = checkFolder(deepPath, folderName)
    if (flage) {
      hasDeep = flage
      global.config_path = deepPath
      return deepPath
    }
    if (!flage) {
      deepPath += '../'
    }
  }
}

const methods = {
  transform,
  randomInt,
  useGreenChalk,
  checkFolder,
  getFilesName,
  titleCase,
  readDirSync,
  requireContext,
  copyFolder,
  checkDirectory,
  deepFindFolder
}

module.exports = methods
