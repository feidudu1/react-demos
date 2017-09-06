const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PageConfig = require('./html/config.js');
const pageInfo = PageConfig.pages;

//定义了一些文件夹的路径
const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');

const getEntries = () => {
    const entries = {vendor: ['./src/vendors/common.js','./src/vendors/sub.js']};
    pageInfo.forEach((page) => {
        if (!page.nojsx) {
            entries[page.name] = `./src/jsx/${page.name}.jsx`;
        }
    });
    return entries;
};

const getHtmlWebpackPlugins = () => {
    return pageInfo.map(function (page) {
        return new HtmlWebpackPlugin({
            title: page.title,
            filename: page.name + '.html',
            chunks: [page.name, 'vendor'],
            template: `./html/template/${page.template || 'common.ejs'}`
        })
    })
};

module.exports = {
    entry: getEntries(),
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', // optional default：[id].[name]
    },
    plugins: [
        ...getHtmlWebpackPlugins(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new CleanWebpackPlugin(['build']),
        new webpack.HotModuleReplacementPlugin()  // 加上后不报[HMR] Hot Module Replacement is disabled
    ],
    devServer: {
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 3030,
        open: true,  // 控制要不要自动打开浏览器
        hot: true   // 修改之后不会重启一个浏览器tab
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel-loader']
            },
            {
                test: /\.less$/,
                loaders: [
                    'style-loader', 'css-loader', 'less-loader'
                ]
            }
        ]
    },
}
