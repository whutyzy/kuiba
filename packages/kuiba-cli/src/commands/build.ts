import webpack from 'webpack'
import * as logger from '../shared/logger'
import { ensureDirSync } from 'fs-extra'
import { buildSiteEntry } from '../compiler/compileSiteEntry'
import { getBuildConfig } from '../config/webpack.build.config'
import { SRC_DIR } from '../shared/constant'

export async function build() {
    process.env.NODE_ENV = 'production'
    ensureDirSync(SRC_DIR)
    await buildSiteEntry()
    const config = getBuildConfig()
    
    webpack(config, (err, stats) => {
        err && logger.error(err.toString())
        stats?.hasErrors() && logger.error(stats.toString())
    })
}
