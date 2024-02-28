import { defineConfig,loadEnv  } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import vitePluginCompression from 'vite-plugin-compression'

const Version = new Date().getTime().toString().match(/.*(.{8})/)[1]
const SecretKey = "c2RmYXNkZmZzZXNkZg=="+Version;

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_PROJECT_ENV)
  return {
    base: './',
    plugins: [
        vue({
            template: {
                compilerOptions: {
                isCustomElement: tag => /^micro-app/.test(tag)
                }
            }
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        viteMockServe({
            mockPath: 'mock', //解析根目录下的mock文件夹
            localEnabled: env.VITE_PROJECT_ENV=='local'?true:false, //mock开关
            prodEnabled: env.VITE_PROJECT_ENV=='uat'?true:false,         //生产环境下为false，这样就不会被打包到生产包中
            ignore: /^\_/,       //忽略开始_路径
        }),
        vitePluginCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
        // 添加别名
        resolve: {
        alias: {
            '@': resolve('src')
        }
        },
        server: {
            host:'0.0.0.0',   
            port: 3000,
            // 是否开启 https
            https: false,
            // 服务器代理配置
            proxy: {
                // 如果请求的路径符合该正则表达式，则会被代理到 target 中
                // '^/api': {
                // target: 'http://localhost:8888',
                // changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
                // },
            },
            // 自定义中间件
            middleware: [],
            // 是否开启自动刷新
            hmr: true,
            // 是否开启自动打开浏览器
            open: true,
        },
        // 环境变量配置
        define: {
        'process.env': {
            MY_SECRET_KEY: SecretKey,
        },
        },
        // 构建配置
        build: {
            // 输出目录，默认是 dist
            // outDir: '/main-vite/',
            // 是否开启 sourcemap
            sourcemap: false,
            // 是否开启压缩
            minify: 'terser', // 可选值：'terser' | 'esbuild'
            terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true
                }
            },
            // // 是否开启 brotli 压缩
            brotli: true,
            // // 是否将模块提取到单独的 chunk 中，默认是 true
            chunkSizeWarningLimit: 1500,
            // // 是否提取 CSS 到单独的文件中
            // cssCodeSplit: true,
            // // 是否开启 CSS 压缩
            // cssMinify: true,
            // // 是否开启 CSS 去重
            // cssInlineLimit: 4096,
            // // 启用/禁用 esbuild 的 minification，如果设置为 false 则使用 Terser 进行 minification
            // target: 'es2018', // 可选值：'esnext' | 'es2020' | 'es2019' | 'es2018' | 'es2017' | 'es2016' | 'es2015' | 'es5'
            // // 是否开启增量式构建
            // incremental: false,
            rollupOptions: {
                input: {
                  main: resolve(process.cwd(), 'index.html'),
                },
                output: {
                    // 超大静态资源拆分,目前就element-plus 包资源过大
                    manualChunks(id){
                      console.log(id,'id')
                      if(id.includes('node_modules')){
                            if (id.toString().split('node_modules/')[1].split('/')[0].includes('element-plus')) {
                                return 'chunk-element-plus'
                            } else {
                                return 'chunk-vendor'
                            }
                      }
                    },
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                }
            },
        
        },
  }
})


