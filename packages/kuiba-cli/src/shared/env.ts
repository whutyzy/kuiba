import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

let _hasYarn:boolean
export const hasYarn = () => {
    if (_hasYarn != null) {
        return _hasYarn
    }
    try {
        execSync('yarn --version', { stdio: 'ignore' })
        return (_hasYarn = true)
    } catch (e) {
        return (_hasYarn = false)
    }
}

export const hasProjectYarn = (cwd:string) => {
    const lockFile = path.join(cwd, 'yarn.lock')
    const result = fs.existsSync(lockFile)
    return checkYarn(result)
}

function checkYarn(result:boolean) {
    if (result && !hasYarn()) throw new Error(`The project seems to require yarn but it's not installed.`)
    return result
}
