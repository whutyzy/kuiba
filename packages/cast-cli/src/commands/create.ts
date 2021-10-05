import path from 'path'
import fs from 'fs-extra'
import inquier from 'inquirer'
import { resolve } from 'path'
import { CWD, CLI_PACKAGE_JSON, TEMPLATES_DIR } from '../shared/constant'
import PackageManager from '../services/PackageManager'
import { log } from '../shared/logger'
import clearConsole from '../shared/clearConsole'

function generatePackageJSON(name: string) {
    const filePath = resolve(CWD, name, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const cliPkg = JSON.parse(fs.readFileSync(CLI_PACKAGE_JSON, 'utf-8'))
    pkg.devDependencies['@cast/cli'] = `^${cliPkg.version}`
    pkg.name = name
    pkg.files = ['es', 'umd', 'highlight', 'types', 'README.md']
    fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2))
}

export async function create(name: string) {
    console.log(name)
    const targetDir = path.join(process.cwd(), name)
    if (fs.existsSync(targetDir)) {
        const { action } = await inquier.prompt([
            {
                type: 'list',
                message: 'Target directory already ex, pick an action',
                name: 'action',
                choices: [
                    { name: 'Overwrite', value: 'ooverwrite' },
                    { name: 'Merged', value: 'merged' }
                ]
            }
        ])
        if (action === 'overwrite') {
            await fs.remove(targetDir)
        }
    }
    await fs.copy(TEMPLATES_DIR, targetDir)
    generatePackageJSON(name)
    /* const pm = new PackageManager(targetDir, 'yarn')
    await pm.install() */
    clearConsole()
    log('\n依赖下载完成! 执行下列命令开始开发：\n')
    log(`cd ${name}`)
    // log(`${pm.bin === 'npm' ? 'npm run' : 'yarn'} dev`)
}
