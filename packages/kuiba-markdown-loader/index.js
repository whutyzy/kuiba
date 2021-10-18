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
    console.log('markdown-loader:-------------------')
    console.log(`<template>\n<div class="kuiba-site-doc" v-pre>${html}</div>\n</template>\n`)
    console.log('end-----------------------------')
    return `<template>\n<div class="kuiba-site-doc" v-pre>${html}</div>\n</template>\n`
}

module.exports = markdownLoader
