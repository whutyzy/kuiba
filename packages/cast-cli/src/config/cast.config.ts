import { pathExistsSync } from 'fs-extra'
import { merge } from 'lodash'
import { CAST_CONFIG, SITE_CONFIG, PACKAGE_JSON} from '../shared/constant'
import { outputFileSyncOnChange } from '../shared/fsUtils'

export function getCastConfig() {
    let config: any = {}
    if (pathExistsSync(CAST_CONFIG)) {
        config = require(CAST_CONFIG)
    }
    const defaultConfigPath = '../../cast.default.config.js'
    delete require.cache[require.resolve(defaultConfigPath)]
    const defaultConfig = require(defaultConfigPath)
    const mergedConfig = merge(defaultConfig, config)
    const source = JSON.stringify(mergedConfig, null, 2)
    if (pathExistsSync(PACKAGE_JSON)) {
        outputFileSyncOnChange(SITE_CONFIG, source)
    }
    return mergedConfig
}
