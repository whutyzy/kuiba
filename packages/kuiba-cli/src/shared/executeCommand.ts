import execa from 'execa'

export default function executeCommand(command:string, args?:any[], cwd?:string):Promise<void> {
    return new Promise((resolve, reject) => {
        const child  = execa(command, args, {
            cwd,
            stdio: ['inherit', 'pipe', 'inherit']
        })

        child.stdout!.on('data', (buffer) => {
            const str = buffer.toString()
            if (/warning/.test(str)) {
                return
            }

            process.stdout.write(buffer)
        })

        child.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`command failed: ${command}`))
                return
            }

            resolve()
        })
    })
}
