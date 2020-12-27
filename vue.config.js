const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir);
}

const vueConfig = {
    publicPath: './',
    pages: {
        index: {
            entry: 'examples/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },

    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/src/')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
        config.resolve.alias
            .set('@', resolve('examples'));
    },
    devServer: {
        // development server port 8000
        port: 7000,
        overlay: { warnings: false, errors: true }
        // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
        // proxy: {
        //   '/api': {
        //     target: 'https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro',
        //     ws: false,
        //     changeOrigin: true
        //   }
        // }
    },

    // disable source map in production
    productionSourceMap: false,
    lintOnSave: 'warning',
    // babel-loader no-ignore node_modules/*
    transpileDependencies: [],
}

module.exports = vueConfig;
