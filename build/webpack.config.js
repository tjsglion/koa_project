const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssPlugin = require('mini-css-extract-plugin'); 
const AfterInjectPlugin = require('./AfterInjectPlugin');
// console.log('参数===>>>>', argv);
const getPath = (url) => path.resolve(__dirname, '..', url);

// 多入口
const entries = {};
const htmlPlugins = [];

const entryFiles = glob.sync(getPath('src/web/entry/**/*.js'));
// console.log('入口文件==>>>', entryFiles);

// 匹配文件名的正则;
const fileRegexp = /([a-zA-Z\d]+)\.entry\.js$/;

// 获取入口文件
entryFiles.forEach(url => {
  if (fileRegexp.test(url)) {
    // console.log('匹配到的文件名===>>>', RegExp.$1);
    const fileName = RegExp.$1;
    entries[fileName] = `./src/web/entry/${fileName}.entry.js`
    htmlPlugins.push(new HtmlWebpackPlugin({
      template: getPath(`src/web/views/${fileName}.html`),
      filename: `views/${fileName}.html`,
      chunks: ['runtime', fileName],
      inject: false
    }))
  }
});

module.exports = {
  entry: entries,
  output: {
    clean: {
      keep (asset) {
        return asset.includes('serve')
      }
    }, // 每次构建时， 清空dist目录
    path: getPath('dist/web'),
    filename: 'assets/js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new CopyPlugin({
      patterns: [
        { from: getPath('src/web/components/banner/banner.html'), to: getPath('dist/web/components/banner/banner.html'), info: {minimized: true} },
        { from: getPath('src/web/layouts/layout.html'), to: getPath('dist/web/layouts/layout.html'), info: {minimized: true} }
      ]
    }),
    new MiniCssPlugin({
      filename: 'assets/css/[name].[chunkhash:8].css'
    }),
    new AfterInjectPlugin()
  ]
};