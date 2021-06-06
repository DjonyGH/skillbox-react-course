const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { DefinePlugin } = require('webpack')

const NODE_ENV = process.env.NODE_ENV

const GLOBAL_CSS_REGEXP = /\.global\.css$/

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../public/server'),
    filename: 'server.js',
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
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportOnlyLocals: true,
              },
            },
          },
          'less-loader',
        ],
        exclude: GLOBAL_CSS_REGEXP,
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader'],
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
  externals: [nodeExternals()],
  optimization: {
    minimize: false,
  },
  plugins: [new DefinePlugin({ 'process.env.CLIENT_ID': `'${process.env.CLIENT_ID}'` })],
}
