const path = require('path')
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const IS_DEV = NODE_ENV === 'development'
const IS_PROD = !IS_DEV

const GLOBAL_CSS_REGEXP = /\.global\.css$/

function setupDevTool() {
  if (IS_DEV) return 'eval'
  if (IS_PROD) return false
}

function getEntry() {
  if (IS_PROD) {
    return [path.resolve(__dirname, '../src/client/index.jsx')]
  }
  return [
    path.resolve(__dirname, '../src/client/index.jsx'),
    'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
  ]
}

function getPlugins() {
  if (IS_PROD) {
    return [
      new DefinePlugin({
        'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
        'process.env.REDIRECT': `'${process.env.REDIRECT}'`,
      }),
    ]
  }
  return [
    new CleanWebpackPlugin(),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'`,
      'process.env.REDIRECT': `'${process.env.REDIRECT}'`,
    }),
  ]
}

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
    },
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: getEntry(),
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
  plugins: getPlugins(),
}
