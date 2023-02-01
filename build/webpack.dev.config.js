const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true,
  devtool: 'inline-cheap-module-source-map'
})