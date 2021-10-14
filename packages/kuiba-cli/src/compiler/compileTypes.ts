import fs from 'fs-extra'
import { TYPES_DIR } from '../shared/constant'
import { camelize } from '../shared/fsUtils'
import { resolve } from 'path'

export async function compileTypes() {
    await fs.ensureDir(TYPES_DIR)
    const dir = await fs.readdir(TYPES_DIR)
    const ignoreEntryDir = dir.filter((fileName) => fileName !== 'index.d.ts')
    
    const exports: string[] = []
    ignoreEntryDir.forEach(fileName => {
        const componentName = camelize(fileName.slice(0, fileName.indexOf('.d.ts')))

        exports.push(`export * from './${componentName}'`)
    })
      const template = `\
import type { App } from 'vue'

export const install: (app: App) => void

${exports.join('\n')}
`
     await fs.writeFile(resolve(TYPES_DIR, 'index.d.ts'), template)
}
