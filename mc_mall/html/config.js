module.exports = {
    pages: [
        // 自定义模板
        {
            name: 'index',
            title: '首页',
        },
        // 走默认模板
        {
            name: 'list',
            title: '列表',
            template: 'list.ejs',
            nojsx: true
        },
    ]
};
