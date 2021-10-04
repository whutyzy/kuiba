import { createServer } from 'vite'
import { ensureDirSync, ensureLink } from 'fs-extra'
import { SRC_DIR } from '../shared/constant'
import {buildSiteEntry} from '../compiler/compileSiteEntry'
import { getDevConfig } from '../config/vite.config'
import { getCastConfig } from '../config/cast.config'
import { merge } from 'lodash'

export default async function (cmd: {force?: boolean}) {
    process.env.NODE_ENV = 'development'
    ensureDirSync(SRC_DIR)
    await buildSiteEntry()

    const devConfig = getDevConfig(getCastConfig())
    const inlineConfig = merge(devConfig, cmd.force ? { server: { force: true } } : {})

    const server = await createServer()
    await server.listen()
}