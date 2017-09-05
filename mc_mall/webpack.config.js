var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var PageConfig = require('./html/config.js');
var pageInfo = PageConfig.pages;

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var getEntries = function () {
    var entries = {vendor: ['./src/common.js','./src/sub.js']};
    pageInfo.forEach(function (page) {
        entries[page.name] = './src/' + page.name + '.js';
    });
    return entries;
};

var getHtmlWebpackPlugins = function () {
    return pageInfo.map(function (page) {
        return new HtmlWebpackPlugin({
            title: page.title,
            filename: page.name + '.html',
            chunks: [page.name, 'vendor'],
            template: './html/template/'+ (page.template || 'common.ejs')
        })
    })
};
var getCommonsChunkPlugins =
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    });
var pluginsObj = getHtmlWebpackPlugins();
pluginsObj.CommonsChunkPlugin = getCommonsChunkPlugins;

module.exports = {
    entry: getEntries(),
    output: {
        path: BUILD_PATH,
        filename: '[name].js',
        chunkFilename: '[name].chunk.js', // optional default：[id].[name]
    },
    plugins: pluginsObj
}
