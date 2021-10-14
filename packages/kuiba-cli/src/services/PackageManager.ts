import execa from 'execa'
import { hasProjectYarn } from '../shared/env'
import executeCommand from '../shared/executeCommand'
import { log } from '../shared/logger'

type PackageManagerName = 'yarn' | 'npm'
const PACKAGE_MANAGER_CONFIG = {
    npm: {
        install: ['install']
    },
    yarn: {
        install: []
    }
} as any

class PackageManager {
    public context: string
    public _registries: { [propertName: string]: any }
    public bin:PackageManagerName = 'yarn'
    constructor(context: string, packageManager: PackageManagerName) {
        this.context = context
        this._registries = {}

        if (packageManager) {
            this.bin = packageManager
        } else if (context) {
            if (hasProjectYarn(context)) {
                this.bin = 'yarn'
            } else {
                this.bin = 'npm'
            }
        }
    }

    // Any command that implemented registry-related feature should support
    // `-r` / `--registry` option
    async setRegistry() {
        const cacheKey = ''
        if (this._registries[cacheKey]) {
            return this._registries[cacheKey]
        }

        let registry

        try {
            if (!registry || registry === 'undefined') {
                registry = (await execa(this.bin, ['config', 'get', 'registry'])).stdout
            }
        } catch (e) {
            // Yarn 2 uses `npmRegistryServer` instead of `registry`
            registry = (await execa(this.bin, ['config', 'get', 'npmRegistryServer'])).stdout
        }

        this._registries[cacheKey] = registry.trim()
        return this._registries[cacheKey]
    }

    async runCommand(command: string, args?: any[]) {
        const prevNodeEnv = process.env.NODE_ENV
        // In the use case of Vue CLI, when installing dependencies,
        // the `NODE_ENV` environment variable does no good;
        // it only confuses users by skipping dev deps (when set to `production`).
        delete process.env.NODE_ENV

        // const registry = await this.setRegistry()
        await executeCommand(
            this.bin,
            [
                ...PACKAGE_MANAGER_CONFIG[this.bin][command],
                ...(args || [])
            ],
            this.context
        )

        if (prevNodeEnv) {
            process.env.NODE_ENV = prevNodeEnv
        }
    }

    async install() {
        log('\n正在下载依赖...\n')
        return await this.runCommand('install')
    }
}

export default PackageManager
