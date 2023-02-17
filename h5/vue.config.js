/*
 * @Description: 
 * @Date: 2023-01-05 18:31:41
 * @LastEditTime: 2023-02-17 14:43:31
 * @Author: xinyanhui@haier.com
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // 引入路径为相对路径
  publicPath: process.env.NODE_ENV === 'production' ? "/iotsdk/": './', 
  // 关闭eslint检查
  lintOnSave: false,
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: 'less'
    }
  },
})
