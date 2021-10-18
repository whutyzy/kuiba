import { get } from 'lodash'
import { resolve } from 'path'
import merge from 'webpack-merge'
import WebpackBarPlugin from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { getKuibaConfig } from './kuiba.config'
import { BASE_CONFIG } from './webpack.base.config'
import { CWD, PRIMARY_COLOR, SITE_PC_HTML, SITE_MOBILE_HTML } from '../shared/constant'

const kuibaConfig = getKuibaConfig()

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
        title: get(kuibaConfig, `${type}.title[${get(kuibaConfig, 'defaultLanguage')}]`),
        logo: get(kuibaConfig, `logo`),
        baidu: get(kuibaConfig, `analysis.baidu`, '')
    }
}

export function getDevServerConfig() {
    const host = get(kuibaConfig, 'host')
    return {
        port: get(kuibaConfig, 'port'),
        host: host === 'localhost' ? 'localhost' : host,
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
