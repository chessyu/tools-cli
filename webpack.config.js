const merge = require('webpack-merge')
const { join, resolve } = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _modeFlag = _mode === 'production'
const _mergeConfig = require(`./config/webpack.${_mode}.js`)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpackBaseConfig = {
  entry: {
    app: resolve('src/client/index.tsx')
  },
  output: {
    path: join(__dirname, './low-code/client')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [resolve('src/client')],
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
        type: 'asset'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src/client'),
      '@api': resolve('src/client/api'),
      '@assets': resolve('src/client/assets'),
      '@components': resolve('src/client/components'),
      '@hooks': resolve('src/client/hooks'),
      '@models': resolve('src/client/models'),
      '@pages': resolve('src/client/pages'),
      '@recoil': resolve('src/client/recoil'),
      '@routes': resolve('src/client/routes'),
      '@utils': resolve('src/client/utils'),
      '@types': resolve('src/client/types')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeFlag
        ? 'styles/[name].[contenthash:5].css'
        : 'style/[name].css',
      chunkFilename: _modeFlag
        ? 'styles/[id].[contenthash:5].css'
        : 'style/[id].css',
      ignoreOrder: true
    })
  ]
}

module.exports = merge.default(webpackBaseConfig, _mergeConfig)
