const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-error-webpack-plugin
//node-notifier webpack-build-notifier

module.exports = {
  mode: 'development',
  // externals:{
  //     khtReactUi : 'kht-react-ui'
  // },
  output: {
    assetModuleFilename: 'images/[name][ext]',
    filename: 'scripts/[name].bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    port: 8086,
    client: {
      overlay: {
        errors: true,
        warnings: false
      },
      logging: 'none',
      progress: true
    },
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8087',
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: '低代码平台',
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html')
    })
  ]
}
