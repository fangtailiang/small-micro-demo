const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  outputDir: 'vue3',
  publicPath: '/child/vue3/',
  transpileDependencies: true,
  devServer: {
    host:'0.0.0.0',   
    port: 4000,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    proxy: {
        // 如果请求的路径符合该正则表达式，则会被代理到 target 中
        // '^/api': {
        // target: 'http://localhost:8888',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // },
    },
},
})
