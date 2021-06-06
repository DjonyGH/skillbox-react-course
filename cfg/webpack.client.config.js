const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = !IS_DEV

const GLOBAL_CSS_REGEXP = /\.global\.css$/

const DEV_PLUGINS = [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()]

const COMMON_PLUGINS = [new DefinePlugin({ 'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'` })]

function setupDevTool() {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: [
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ],
  output: {
    path: path.resolve(__dirname, '../public/client'),
    filename: 'client.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
        exclude: [/node_modules/],
      },
      {
        test: [/\.less$/, /\.css$/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          'less-loader',
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devtool: setupDevTool(),
  plugins: IS_DEV ? DEV_PLUGINS.concat(COMMON_PLUGINS) : COMMON_PLUGINS,
}
