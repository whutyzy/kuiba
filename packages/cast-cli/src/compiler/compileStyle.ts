import { writeFileSync } from 'fs-extra'
import path from 'path'
import sass from 'sass'
import { replaceExt, smartAppendFileSync } from '../shared/fsUtils'

const EMPTY_SPACE_RE = /[\s]+/g
export const EMPTY_LINE_RE = /[\n\r]*/g
export const IMPORT_CSS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.css)['"]\s*;?(?!\s*['"`])/g
export const IMPORT_SASS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.s[ac]ss)['"]\s*;?(?!\s*['"`])/g

export const STYLE_IMPORT_RE = /@import\s+['"](.+)['"]\s*;/g

export const clearEmptyLine = (s: string) => s.replace(EMPTY_LINE_RE, '').replace(EMPTY_SPACE_RE, ' ')

export function normalizeStyleDependency(styleImport: string, reg: RegExp) {
    let relativePath = styleImport.replace(reg, '$1')
    relativePath = relativePath.replace(/(\.sass)|(\.scss)|(\.css)/, '')

    if (relativePath.startsWith('./')) {
        return '.' + relativePath
    }

    return '../' + relativePath
}

export function extractStyleDependencies(
    file: string,
    code: string,
    reg: RegExp,
    expect: 'css' | 'sass' | 'scss',
    self: boolean
) {
    const { dir, base } = path.parse(file)
    const styleImports = code.match(reg) ?? []
    const cssFile = path.resolve(dir, './style/index.js')
    const sassFile = path.resolve(dir, './style/scss.js')
    styleImports.forEach((styleImport: string) => {
        const normalizedPath = normalizeStyleDependency(styleImport, reg)
        smartAppendFileSync(cssFile, `import '${normalizedPath}.css'\n`)
        smartAppendFileSync(sassFile, `import '${normalizedPath}.${expect}'\n`)
    })
    if (self) {
        smartAppendFileSync(cssFile, `import '${normalizeStyleDependency(base, reg)}.css'\n`)
        smartAppendFileSync(sassFile, `import '${normalizeStyleDependency(base, reg)}.${expect}'\n`)
    }

    return code.replace(reg, '')
}

export function compileSass(file: string) {
    const { css } = sass.renderSync({ file })
    writeFileSync(replaceExt(file, '.css'), clearEmptyLine(css.toString()), 'utf-8')
}


