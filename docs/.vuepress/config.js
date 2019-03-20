module.exports = {
    base: '/blog/',
    title: 'apple54whn',
    description: 'apple54whn的博客,conanan的博客',
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
        }
    },
    themeConfig: {
        // sidebar: 'auto',
        displayAllHeaders: false,
        lastUpdated: '上次更新时间', // string | boolean
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'apple54whn/blog',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '编辑文档！',
        nav: [{
                text: '面试总结',
                link: '/interview/'
            },
            {
                text: 'Java',
                items: [{
                        text: 'Core Java',
                        link: '/Java/Core Java/'
                    },
                    {
                        text: 'Framework',
                        items: [{
                                text: 'Spring Boot',
                                link: '/Java/Spring Boot/'
                            },
                            {
                                text: 'Spring Cloud',
                                link: '/Java/Spring Cloud/'
                            },
                            {
                                text: 'Dobbo + Zookeeper',
                                link: '/Java/Dobbo/'
                            },
                            {
                                text: 'Service Mesh',
                                link: '/Java/Service Mesh/'
                            },
                        ]
                    },

                ]
            },
            {
                text: 'Database',
                items: [{
                        text: 'SQL',
                        items: [{
                                text: 'MySQL',
                                link: '/SQL/MySQL/'
                            },
                            {
                                text: 'Oracle',
                                link: '/SQL/Oracle/'
                            },
                            {
                                text: 'MyBatis',
                                link: '/Framework/MyBatis/'
                            },
                            {
                                text: 'Spring Data JPA',
                                link: '/Framework/Spring Data JPA/'
                            },
                        ]
                    },
                    {
                        text: 'NoSQL',
                        items: [{
                                text: 'Redis',
                                link: '/NoSQL/Redis/'
                            },
                            {
                                text: 'MongoDB',
                                link: '/NoSQL/MongoDB/'
                            },
                            {
                                text: 'Elasticsearch',
                                link: '/NoSQL/Elasticsearch/'
                            },
                        ]
                    },


                ]
            },

            // {
            //     text: 'GitHub',
            //     link: 'https://github.com/apple54whn'
            // },

        ],
        sidebar: {
            '/interview/': [
                '', /* /JAVA基础/ */
                '集合', /* /foo/two.html */
                '多线程', /* /foo/one.html */
                'IO',
                'Spring' /* /foo/two.html */
            ],

            '/Java/Core Java/': [
                '', /* /bar/ */
                'Java2', /* /bar/three.html */
            ],

            // fallback
            '/': [
                '', /* / */
            ]
        }






    }
}