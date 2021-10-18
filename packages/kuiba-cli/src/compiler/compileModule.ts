import webpack from 'webpack'
import { resolve } from 'path'
import { copy, ensureFileSync, readdir, removeSync } from 'fs-extra'

import { EXAMPLE_DIR_NAME, TESTS_DIR_NAME, DOCS_DIR_NAME, SRC_DIR, ES_DIR, STYLE_DIR_NAME } from '../shared/constant'
import { getPublicDirs, isDir, isSass, isScript, isSFC } from '../shared/fsUtils'
import { compileSFC } from './compileSFC'
import { compileLibraryEntry, compileScriptFile } from './compileScript'
import { compileSass } from './compileStyle'
import { getUmdConfig } from '../config/webpack.umd.config'
import * as logger from '../shared/logger'

export function compileUMD() {
    return new Promise<void>((resolve, reject) => {
        const config = getUmdConfig()

        webpack(config, (err, stats: any) => {
            if (err || stats?.hasErrors()) {
                logger.error(err?.toString() || stats)
                reject()
            }

            resolve()
        })
    })
}

export async function compileDir(dir: string) {
    const dirs = await readdir(dir)
    await Promise.all(
        dirs.map((fileName) => {
            const file = resolve(dir, fileName)
            if ([TESTS_DIR_NAME, EXAMPLE_DIR_NAME, DOCS_DIR_NAME].includes(fileName)) {
                removeSync(file)
                return Promise.resolve()
            }
           
            if (fileName === STYLE_DIR_NAME) {
                return Promise.resolve()
            }

            return compileFile(file)
        })
    )
}

export async function compileFile(file: string) {
    isSFC(file) && (await compileSFC(file))
    isScript(file) && (await compileScriptFile(file))
    isSass(file) && (await compileSass(file))
    isDir(file) && (await compileDir(file))
}

export async function compileModule(modules: string | boolean = false) {
    if (modules === 'umd') {
        await compileUMD()
        return
    }
    await copy(SRC_DIR, ES_DIR)
    const moduleDir: string[] = await readdir(ES_DIR)
    await Promise.all(
        moduleDir.map((filename: string) => {
            const file: string = resolve(ES_DIR, filename)

            if (isDir(file)) {
                ensureFileSync(resolve(file, './style/index.js'))
                ensureFileSync(resolve(file, './style/scss.js'))
            }
            return isDir(file) ? compileDir(file) : null
        })
    )
    await compileLibraryEntry(ES_DIR, await getPublicDirs())
}
