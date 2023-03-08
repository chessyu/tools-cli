const os = require('os')

function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (const key in interfaces) {
    const iface = interfaces[key]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

class ModuleConfig {
  constructor() {
    this._ip = getIPAdress()
  }

  _ip = ''

  /** 当前服务`ip`地址 */
  get ip() {
    return this._ip
  }

  /** 服务器公网`ip` */
  publicIp = '123.123.123'

  /** 服务器内网`ip` */
  privateIp = '17.17.17.17'

  /** 是否开发模式 */
  get isDev() {
    return this.ip != this.privateIp
  }

  /** 端口号 */
  get port() {
    return this.isDev ? 8087 : 80
  }

  /** 接口前缀 */
  apiPrefix = '' // "/api";
}

/** 项目配置 */
const config = new ModuleConfig()

module.exports = config
