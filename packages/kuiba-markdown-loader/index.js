const markdown = require('markdown-it')
const hljs = require('highlight.js')
const loaderUtils = require('loader-utils')

function cardWrapper(html) {
    const group = html.replace(/<h3/g, ':::<h3').replace(/<h2/g, ':::<h2').split(':::')
    return group
        .map((fragment) => {
            if (fragment.indexOf('<h3') !== -1) {
                return `<div class="card">${fragment}</div>`
            }

            return fragment
        })
        .join('')
}

function highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        return (
            '<pre class="hljs"><code><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/color-brewer.min.css">' +
            hljs.highlight(lang, str, true).value +
            '</code></pre>'
        )
    }

    return ''
}

function markdownLoader(source) {
    const md = markdown({
        html: true,
        typographer: true,
        highlight
    })
    const html = cardWrapper(md.render(source))
    return `<template>\n<div class="kuiba-site-doc" v-pre>${html}</div>\n</template>\n<script>export default {}</script>`
}

module.exports = markdownLoader

/* import { render } from './zh-CN.md?vue&type=template&id=05445113'
const script = {}
script.render = render

if (module.hot) {
    script.__hmrId = '05445113'
    const api = __VUE_HMR_RUNTIME__
    module.hot.accept()
    if (!api.createRecord('05445113', script)) {
        console.log('script reload')
        api.reload('05445113', script)
    }

    module.hot.accept('./zh-CN.md?vue&type=template&id=05445113', () => {
        api.rerender('05445113', render)
        console.log(render)
    })
}

script.__file = 'src/button/docs/zh-CN.md'

export default script */
