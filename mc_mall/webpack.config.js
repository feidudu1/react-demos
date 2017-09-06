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
    const entries = {vendor: ['./src/common.js','./src/sub.js']};
    pageInfo.forEach((page) => {
        entries[page.name] = `./src/${page.name}.js`;
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
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
}
