import * as logger from '../shared/logger'
import { runCLI } from 'jest'
import { CWD, JEST_CONFIG } from '../shared/constant'

export async function jest(cmd: {
    watch: boolean; updateSnapshot: boolean, component: string; clearCache: boolean, debug: boolean
}) {
    process.env.NODE_ENV = 'test'
    console.log('jest')
    const config = {
        rootDir: CWD,
        watch: cmd.watch,
        clearCache: cmd.clearCache,
        config: JEST_CONFIG,
        updateSnapshot: cmd.updateSnapshot,
        testMatch: cmd.component && [`**/${cmd.component}/__tests__/*.[jt]s`],
        debug: cmd.debug,
        maxWorkers: '50%'
    }

    try {
        const response = await runCLI(config as any, [CWD])
        if (!response.results.success && !cmd.watch) {
            process.exit(1)
        }
    } catch (e:any) {
        logger.error(e.toString())
        process.exit(1)
    }
}
