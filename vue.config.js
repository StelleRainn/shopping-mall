const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // // 使网站可以使用相对路径来寻找文件，不强制将打包后的文件放在服务器根目录下
  // publicPath: './',

  // 为部署到 GitHub Pages，作如下修改：
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shopping-mall-vue2-demo/'
    : '/',
  transpileDependencies: true
})
