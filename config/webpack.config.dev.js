const path = require('path')
const { merge } = require('webpack-merge')
const UserScriptMetaDataPlugin = require('../')
const metadata = require('./metadata')

const webpackConfig = require('./webpack.config.base')

const output = {
  filename: metadata.name + '.prod.user.js',
}

metadata.require.push(
  'file://' + path.resolve(__dirname, '../dist', output.filename)
)

const cfg = merge(webpackConfig, {
  mode: 'development',
  entry: {
    prod: webpackConfig.entry,
    dev: path.resolve(__dirname, './empty.js'),
  },
  output: {
    filename: `${metadata.name}.[name].user.js`,
    path: path.resolve(__dirname, '../dist'),
  },
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new UserScriptMetaDataPlugin({
      metadata,
    }),
  ],
})


module.exports = cfg
