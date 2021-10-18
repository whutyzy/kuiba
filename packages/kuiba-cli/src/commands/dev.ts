import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import { ensureDirSync } from 'fs-extra'
import { getPort } from 'portfinder'
import { buildSiteEntry } from '../compiler/compileSiteEntry'
import { error } from '../shared/logger'
import { SRC_DIR } from '../shared/constant'
import { getDevConfig, getDevServerConfig } from '../config/webpack.dev.config'
import { getKuibaConfig } from '../config/kuiba.config'
import { get } from 'lodash'

export async function runDevServer(port: number, config: any) {
    const devServerConfig = getDevServerConfig()
    devServerConfig.port = port
    config.plugins.push(
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${devServerConfig.host}:${port}`],
                notes: []
            },
            clearConsole: true
        })
    )
    const server = new WebpackDevServer(devServerConfig, webpack(config))

    await server.start()
}

export async function dev() {
    process.env.NODE_ENV = 'development'
    ensureDirSync(SRC_DIR)
    await buildSiteEntry()
    const kuibaConfig = getKuibaConfig()
    const config = getDevConfig()
    const port = get(kuibaConfig, 'port')
    getPort({ port }, (err: Error, port: number) => {
        if (err) {
            error(err)
            return
        }
        runDevServer(port, config)
    })
}
