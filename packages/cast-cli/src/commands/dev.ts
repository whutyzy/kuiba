import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import { ensureDirSync} from 'fs-extra'
import { getPort } from 'portfinder'
import { error } from '../shared/logger'
import { SRC_DIR } from '../shared/constant'
import { getDevConfig, getDevServerConfig } from '../config/webpack.dev.config'
import { getCastConfig } from '../config/cast.config'
import { get } from 'lodash'


export async function runDevServer(port:number, config: any) {
    const devServerConfig = getDevServerConfig()
    devServerConfig.port = port
    const server = new WebpackDevServer(devServerConfig, webpack(config))

    await server.start()
}

export async function dev() {
    process.env.NODE_ENV = 'development'
    ensureDirSync(SRC_DIR)
    const castConfig = getCastConfig()
    const config = getDevConfig()
    const port = get(castConfig, 'port')
    getPort({ port }, (err: Error, pport: number) => {
        if (err) {
            error(err)
            return
        }
        runDevServer(port, config)
    })
}
