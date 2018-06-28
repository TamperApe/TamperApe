process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
let config = require('react-scripts/config/webpack.config.prod.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { injectBabelPlugin } = require('react-app-rewired');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

fs.remove(paths.appBuild);

config.entry = config.entry.filter(
    entry => !entry.includes('webpackHotDevClient')
);
//字符串导入userscript
config.module.rules.push({
    test: /\.js$/,
    include: [
        resolveApp('src/userscripts')
    ],
    use: 'raw-loader'
});

//找到html生成插件
let htmlWebpackPlugin = config.plugins.find(item => {
    return item.constructor.name === 'HtmlWebpackPlugin'
});
//只引用app.js
htmlWebpackPlugin.options.chunks = ['app'];

config.output.path = paths.appBuild;
config.output.publicPath = paths.servedPath;
config.output.filename = '[name].js';

//antd动态样式加载
config = injectBabelPlugin(
    ['import',
        {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }
    ], config);

config.entry.shift();
//添加入口文件
config.entry =
    {
        app: resolveApp(paths.appIndexJs),
        background: resolveApp('src/platform/chrome/background.js'),
        content_document_start: resolveApp('src/platform/chrome/content_document_start.js'),
    };
config.devtool = undefined;

const compiler = webpack(config);
compiler.run((err, stats) => {
    if (err) {
        console.error(err);
    } else {
        copyPublicFolder();
    }
})

// webpack(config).watch({}, (err, stats) => {
//     if (err) {
//         console.error(err);
//     } else {
//         copyPublicFolder();
//     }
//     console.error(stats.toString({
//         chunks: false,
//         colors: true
//     }));
// });

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appBuild, {
        dereference: true,
        filter: file => file !== paths.appHtml
    });
}