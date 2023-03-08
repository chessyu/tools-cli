const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-error-webpack-plugin
//node-notifier webpack-build-notifier
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  output: {
    assetModuleFilename: 'images/[name].[contenthash:5].bundle.[ext]',
    filename: 'scripts/[name].[contenthash:5].bundle.js',
    publicPath: '/'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/g
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'async',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name: 'commons'
        }
      },
      minSize: {
        javasctipt: 100000,
        style: 100000
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '低代码平台',
      filename: 'index.html',
      template: resolve(__dirname, '../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}
