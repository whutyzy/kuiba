import { transformAsync } from '@babel/core'
import { writeFileSync, readFileSync, removeSync, writeFile } from 'fs-extra'
import { resolve } from 'path'
import { extractStyleDependencies, IMPORT_CSS_RE, IMPORT_SASS_RE } from './compileStyle'
import { bigCamelize, replaceExt } from '../shared/fsUtils'

import type { BabelFileResult } from '@babel/core'


export const IMPORT_VUE_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.vue(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_TS_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.ts(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_JSX_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.jsx(\s*['"`]);?(?!\s*['"`])/g
export const IMPORT_TSX_PATH_RE = /((?<!['"`])import\s+.+from\s+['"]\s*\.{1,2}\/.+)\.tsx(\s*['"`]);?(?!\s*['"`])/g

const scriptReplacer = (_: any, p1: string, p2: string): string => `${p1}.js${p2}`

export const replaceVueExt = (script: string): string => script.replace(IMPORT_VUE_PATH_RE, scriptReplacer)

export const replaceTSExt = (script: string): string => script.replace(IMPORT_TS_PATH_RE, scriptReplacer)

export const replaceJSXExt = (script: string): string => script.replace(IMPORT_JSX_PATH_RE, scriptReplacer)

export const replaceTSXExt = (script: string): string => script.replace(IMPORT_TSX_PATH_RE, scriptReplacer)

export async function compileScript(script: string, file: string) {
    let { code } = (await transformAsync(script, {
        filename: file
    })) as BabelFileResult
    code = extractStyleDependencies(file, code as string, IMPORT_CSS_RE, 'css', false)
    code = extractStyleDependencies(file, code as string, IMPORT_SASS_RE, 'scss', false)
    code = replaceVueExt(code as string)
    code = replaceTSXExt(code as string)
    code = replaceJSXExt(code as string)
    code = replaceTSExt(code as string)
    removeSync(file)
    writeFileSync(replaceExt(file, '.js'), code, 'utf-8')
}

export async function compileScriptFile(file: string) {
    const source = readFileSync(file, 'utf-8')
    await compileScript(source, file)
}

export async function compileLibraryEntry(dir: string, publicDirs: string[]) {
    const imports: string[] = []
    const plugins: string[] = []
    const constInternalComponents: string[] = []
    const cssImports: string[] = []
    const sassImports: string[] = []
    const publicComponents: string[] = []
    publicDirs.forEach((dirname) => {
        const publicComponent = bigCamelize(dirname)
        publicComponents.push(publicComponent)
        imports.push(`import ${publicComponent}, * as ${publicComponent}Module from './${dirname}'`)
        constInternalComponents.push(
            `export const _${publicComponent}Component = ${publicComponent}Module._${publicComponent}Component || {}`
        )
        plugins.push(`${publicComponent}.install && app.use(${publicComponent})`)
        cssImports.push(`import './${dirname}/style'`)
        sassImports.push(`import './${dirname}/style/scss'`)
    
    })
    const install = `
function install(app) {
  ${plugins.join('\n  ')}
}
`
    const indexTemplate = `\
${imports.join('\n')}\n
${constInternalComponents.join('\n')}\n
${install}
export {
  install,
  ${publicComponents.join(',\n  ')}
}


export default {
  install,
  ${publicComponents.join(',\n  ')}
}
`
    const styleTemplate = `\
${cssImports.join('\n')}
`

    const umdTemplate = `\
${imports.join('\n')}\n
${cssImports.join('\n')}\n
${install}
export {
  install,
  ${publicComponents.join(',\n  ')}
}
export default {
  install,
  ${publicComponents.join(',\n  ')}
}
`

    const sassTemplate = `\
${sassImports.join('\n')}
`
    await Promise.all([
        writeFile(resolve(dir, 'index.js'), indexTemplate, 'utf-8'),
        writeFile(resolve(dir, 'umdIndex.js'), umdTemplate, 'utf-8'),
        writeFile(resolve(dir, 'style.js'), styleTemplate, 'utf-8'),
        writeFile(resolve(dir, 'scss.scss'), sassTemplate, 'utf-8')
    ])
}

