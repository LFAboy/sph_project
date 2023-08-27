const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
// 引入一个插件来解析 vue 文件
// const { VueLoaderPlugin } = require('vue-loader/dist/index');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "main.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // 由于存在对一种文件类型需要多个 loader 处理，所以这里是一个数组。比如我们的 ts 文件需要用 ts-loader 转换成 js 后再经过 babel 转换成 低版本的JS。
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(process.cwd(), 'tsconfig.json'),
              appendTsSuffixTo: [/\.vue$/]
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.(jpg|png|jpeg|gif|bmp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.vue$/i,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ]
      }
    ]
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'), to: path.resolve(__dirname, 'dist')
        },
      ]
    }),
    new htmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      title: 'LFAboy'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 这个选项是 尝试按照顺序 （添加后缀名）解析文件,可以省略文件路径的后缀名
    extensions: ['.js', '.json', '.wasm', '.ts'],
    // 下面的配置是 配置 整个项目 的路径别名
    alias: {
      '@': path.resolve(__dirname, './src/')
    },
  },
  devServer: {
    // 开启模块热替换，其实 webpack-dev-server 4版本默认就是开启的
    // hot: true,
    // 配置代理 (只在本地开发有效，上线后无效)
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {'^/api': ''},
        changeOrigin: true,
        secure: false
      }
    }
  },
  devtool: 'inline-source-map'
}