var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PageConfig = require('./html/config.js');
var pageInfo = PageConfig.pages;

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var getHtmlWebpackPlugins = function () {
    return pageInfo.map(function (page) {
        return new HtmlWebpackPlugin({
            title: page.title,
            filename: page.name + '.html',
            chunks: [page.name],
            template: './html/template/'+ (page.template || 'common.ejs')
        })
    })
};
var getEntries = function () {
    var entries = {};
    pageInfo.forEach(function (page) {
        entries[page.name] = './src/' + page.name + '.js';
    });
    return entries;
}

module.exports = {
    entry: getEntries(),
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    plugins: getHtmlWebpackPlugins()
}
