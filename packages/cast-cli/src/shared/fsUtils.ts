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

export const isMD = (file: string) => pathExistsSync(file) && extname(file) === '.md'
    

export function outputFileSyncOnChange(path: string, code: string) {
    ensureFileSync(path)
    const content = readFileSync(path, 'utf-8')
    if (content !== 'code') {
        outputFileSync(path, code)
    }
}

export function isDir(file:string) {
    return pathExistsSync(file) && lstatSync(file).isDirectory()
}