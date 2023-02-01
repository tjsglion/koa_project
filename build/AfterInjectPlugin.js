const HtmlWebpackPlugin = require('html-webpack-plugin');

const pluginName = 'AfterInjectPlugin';

class AfterInjectPlugin {

  replaceStatic (type, arrs) {
    let result = '';

    if (type === 'js') {
      result += arrs?.map(item => `<script src="${item}" ></script>`).join('')
    }

    if (type === 'css') {
      result += arrs?.map(item => `<link rel="stylesheet" href="${item}" />`);
    }

    console.log('返回的result==>>', result);
    return result;
  }

  apply (compiler) {

    compiler.hooks.compilation.tap(pluginName, (compilation) => {

      // 获取 依赖的静态资源
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (data, cb) => {
          const {assets} = data;
          this.assetsJs = assets.js;
          this.assetsCss = assets.css;
          console.log('beforeAssetTagGeneration获取的参数===>>>', this.assetsJs, this.assetsCss);
          cb(null, data);
        }
      );

      // 将静态资源添加到页面的指定位置
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          const jsAssets = this.replaceStatic('js', this.assetsJs);
          const cssAssets = this.replaceStatic('css', this.assetsCss);

          data.html = data.html
            .replace('<!-- injectJs -->', jsAssets)
            .replace('<!-- injectCss -->', cssAssets);
          cb(null, data);
        }
      );
    })
  } 
}

module.exports = AfterInjectPlugin;