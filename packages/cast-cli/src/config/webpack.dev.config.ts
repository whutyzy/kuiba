import { get } from 'lodash'
import { CWD, PRIMARY_COLOR, SITE_PC_HTML, SITE_MOBILE_HTML } from '../shared/constant'
import { resolve } from 'path'
import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { getCastConfig } from './cast.config'
import {BASE_CONFIG} from './webpack.base.config'

const castConfig = getCastConfig()

export const HTML_WEBPACK_PLUGINS = [
    new HtmlWebpackPlugin({
        template: SITE_PC_HTML,
        filename: 'index.html',
        ...createHtmlPluginOptions('pc')
    }),
    new HtmlWebpackPlugin({
        template: SITE_MOBILE_HTML,
        filename: 'mobile.html',
        ...createHtmlPluginOptions('mobile')
    })
]

function createHtmlPluginOptions(type: 'pc' | 'mobile') {
    return {
        hash: true,
        chunks: [type],
        title: get(castConfig, `${type}.title[${get(castConfig, 'defaultLanguage')}]`),
        logo: get(castConfig, `logo`),
        baidu: get(castConfig, `analysis.baidu`, '')
    }
}

export function getDevServerConfig() {
    const host = get(castConfig, 'host')
    return {
        port: get(castConfig, 'port'),
        host: host === 'localhost' ? '0.0.0.0' : host,
        static: {
            directory: resolve(CWD, 'public')
        },
        allowedHosts: 'all',
        hot: true
    }
}

export function getDevConfig() {
    return merge(BASE_CONFIG, {
        mode: 'development',
        devtool: 'source-map', 
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 0,
                        name: 'chunks'
                    }
                }
            }
        },
        plugins: [
            new WebpackBarPlugin({
                name: 'Site development building',
                color: PRIMARY_COLOR
            }),
            ...HTML_WEBPACK_PLUGINS
        ]
    })

}
