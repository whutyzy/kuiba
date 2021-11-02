module.exports = {
    name: 'Kuiba',
    namespace: 'kuiba',
    title: 'Kuiba UI',
    logo: './kuiba.png',
    useMobile: true,
    themes: {
        'color-primary': '#A4EBF3',
        'color-link': '#009688',
        'color-type': '#009688',
        'color-progress': '#009688',
        'color-side-bar': '#009688',
        'color-side-bar-active-background': '#00968821',
        'color-app-bar': '#009688',
        'color-mobile-cell-hover': '#009688',
        'color-mobile-cell-hover-background': '#00968821'
    },
    highlight: {
        style: './highlight.css'
    },
    pc: {
        redirect: '/home',
        title: {
            'zh-CN': '魁拔UI'
        },
        header: {
            i18n: null,
            github: 'https://github.com/whutyzy/kuiba'
        },
        menu: [
            {
                text: {
                    'zh-CN': '开发指南'
                },
                type: 1
            },
            {
                text: {
                    'zh-CN': '基本介绍'
                },
                doc: 'home',
                type: 3
            },
            {
                text: {
                    'zh-CN': '快速开始'
                },
                doc: 'quickStart',
                type: 3
            },
            {
                text: {
                    'zh-CN': '按需引入'
                },
                doc: 'importOnDemand',
                type: 3
            },
            {
                text: {
                    'zh-CN': '自定义主题'
                },
                doc: 'customTheme',
                type: 3
            },
            {
                text: {
                    'zh-CN': '浏览器适配'
                },
                doc: 'browserAdaptation',
                type: 3
            },
            {
                text: {
                    'zh-CN': '基础组件'
                },
                type: 1
            },
            {
                text: {
                    'zh-CN': 'Button 按钮'
                },
                doc: 'button',
                type: 2
            },
            {
                text: {
                    'zh-CN': 'Icon 图标'
                },
                doc: 'icon',
                type: 2
            },
            {
                text: {
                    'zh-CN': 'Loading 加载'
                },
                doc: 'loading',
                type: 2
            },
            {
                text: {
                    'zh-CN': 'Image 图片'
                },
                doc: 'image',
                type: 2
            },
            {
                text: {
                    'zh-CN': '通用指令'
                },
                type: 1
            },
            {
                text: {
                    'zh-CN': '懒加载'
                },
                doc: 'lazyload',
                type: 2
            }
        ]
    },
    mobile: {
        redirect: '/home',
        title: {
            'zh-CN': '魁拔UI'
        },
        description: '基于vue3的移动端组件库',
        header: {
            i18n: null
        }
    }
}
