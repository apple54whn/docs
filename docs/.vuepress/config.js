const pluginsConf = require('../../config/pluginsConf.js');
const navConf = require('../../config/navConf.js');
const sidebarConf = require('../../config/sidebarConf.js');

module.exports = {
    // base: '/blog/',
    title: 'Conanan',
    description: 'apple54whn的博客,conanan的博客',
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    head: [
        ['link', {
            rel: 'manifest',
            href: '/manifest.json'
        }]
    ],
    //PWA，弹出更新按钮
    plugins: pluginsConf,
    themeConfig: {
        // sidebar: 'auto',
        displayAllHeaders: false, //显示所有页面标题，关了清晰明了
        sidebarDepth: 2, //值为0则显示标题1/2/3级，但是好像不起作用。在每个页面配置就起作用了。默认为1，提取到h2
        lastUpdated: '上次更新时间', // string | boolean

        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'apple54whn/blog',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '编辑文档！',

        nav: navConf,
        sidebar: sidebarConf,
    },
    markdown: {
        // lineNumbers: true
    }
}