var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PageConfig = require('./html/config.js');
var pageInfo = PageConfig.pages;

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var getHtmlWebpackPlugins = (function () {
    return pageInfo.map(function (page) {
        return new HtmlWebpackPlugin({
            title: page.title,
            filename: page.name + '.html',
        })
    })
})();

module.exports = {
    entry: SRC_PATH,
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    plugins: getHtmlWebpackPlugins
}
