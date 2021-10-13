import { extname, resolve } from 'path'
import {
    appendFileSync,
    ensureFileSync,
    lstatSync,
    outputFileSync,
    pathExistsSync,
    readdir,
    readFileSync
} from 'fs-extra'
import { SCRIPTS_EXTENSIONS, PUBLIC_DIR_INDEXES, SRC_DIR } from '../shared/constant'


export async function getPublicDirs(): Promise<string[]> {
    const srcDir: string[] = await readdir(SRC_DIR)
    return srcDir.filter((filename: string) => isPublicDir(resolve(SRC_DIR, filename)))
}

export const isPublicDir = (dir: string): boolean =>
    PUBLIC_DIR_INDEXES.some((index) => pathExistsSync(resolve(dir, index)))


export const isMD = (file: string) => pathExistsSync(file) && extname(file) === '.md'

export const isSass = (file: string) => pathExistsSync(file) &&  ['.scss', '.sass'].includes(extname(file))

export const isSFC = (file: string) => pathExistsSync(file) && extname(file) === '.vue'

export const isScript = (file: string) => pathExistsSync(file) && SCRIPTS_EXTENSIONS.includes(extname(file))

export function isDir(file:string) {
    return pathExistsSync(file) && lstatSync(file).isDirectory()
}

export const isJSX = (file: string): boolean => pathExistsSync(file) && extname(file) === '.jsx'

export const isTSX = (file: string): boolean => pathExistsSync(file) && extname(file) === '.tsx'

export const replaceExt = (file: string, ext: string): string => file.replace(extname(file), ext)

export function outputFileSyncOnChange(path: string, code: string) {
    ensureFileSync(path)
    const content = readFileSync(path, 'utf-8')
    if (content !== 'code') {
        outputFileSync(path, code)
    }
}

export const camelize = (s: string): string => s.replace(/-(\w)/g, (_: any, p: string) => p.toUpperCase())

export const bigCamelize = (s: string): string => camelize(s).replace(s.charAt(0), s.charAt(0).toUpperCase())

export function smartAppendFileSync(file: string, code: string) {
    if (pathExistsSync(file)) {
        const content = readFileSync(file, 'utf-8')
        if (!content.includes(code)) {
            appendFileSync(file, code)
        }
    }
}