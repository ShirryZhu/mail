const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // configureWebpack: {
  //   resolve: {
  //     // extensions中定义哪些扩展名不用写
  //     extensions: ['.js', '.vue', '.json'],
  //     alias: {
  //       // src的别名时默认别名，可以不需要专门配置
  //       "@": 'src',
  //       "assets": 'src/assets',
  //       "components": 'src/components',
  //       "pages": 'src/pages',
  //       "network": 'src/network',
  //       "common": 'src/common'
  //     }
  //   }
  // }
})
