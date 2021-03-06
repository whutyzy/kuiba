module.exports = {
    name: 'kuiba',
    namespace: 'kuiba',
    host: 'localhost',
    port: 8080,
    title: 'KUIBA',
    logo: '',
    defaultLanguage: 'zh-CN',
    highlight: {
        /**
         * @see https://highlightjs.org/
         */
        style: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/nord.min.css'
    },
    analysis: {
        baidu: ''
    },
    useMobile: false,
    pc: {
        menu: [],
        redirect: '/home',
        title: {
            'zh-CN': 'Kuiba 面向Vue3的Material风格移动端组件库',
            'en-US': 'Material design mobile components built for Vue3'
        },
        header: {
            i18n: {
                'zh-CN': '中文',
                'en-US': 'English'
            },
            github: 'https://github.com/haoziqaq/varlet'
        }
    },
    mobile: {
        redirect: '/home',
        title: {
            'zh-CN': 'Varlet 面向Vue3的Material风格移动端组件库',
            'en-US': 'Material design mobile components built for Vue3'
        },
        header: {
            i18n: {
                'zh-CN': '中文',
                'en-US': 'English'
            }
        }
    },
    themes: {
        'color-primary': '#1d92e9',
        'color-link': '#00c48f',
        'color-type': '#00c48f',
        'color-progress': '#1d92e9',
        'color-progress-track': '#fff',
        'color-pc-language-active': '#3a7afe',
        'color-pc-language-active-background': '#edf5ff',
        'color-side-bar': '#3a7afe',
        'color-side-bar-active-background': '#3a7afe1a',
        'color-app-bar': '#3a7afe',
        'color-mobile-cell-hover': '#3a7afe',
        'color-mobile-cell-hover-background': '#3a7afe1a',
        'color-mobile-language-active': '#3a7afe',
        'color-mobile-language-active-background': '#edf5ff'
    }
}
