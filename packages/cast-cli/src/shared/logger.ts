import chalk from 'chalk'

import readline from 'readline'



const chalkTag = (msg:string) => chalk.bgBlackBright.white.dim(` ${msg} `)

export const log = (msg = '', tag = null) => {
    tag ? console.log(chalkTag(tag), msg) : console.log(msg)
}

export const info = (msg: string, tag = null) => {
    console.log(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg)
}

export const warn = (msg: string, tag = null) => {
    console.warn(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg))
}

export const success = (msg: string, tag = null) => {
    console.log(chalk.bgGreen.black(' SUCCESS ') + (tag ? chalkTag(tag) : ''), chalk.green(msg))
}

export const error = (msg:string|Error, tag = null) => {
    console.error(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg))
    if (msg instanceof Error) {
        console.error(msg.stack)
    }
}

export const clearConsole = (title:string) => {
    if (process.stdout.isTTY) {
        const blank = '\n'.repeat(process.stdout.rows)
        console.log(blank)
        readline.cursorTo(process.stdout, 0, 0)
        readline.clearScreenDown(process.stdout)
        if (title) {
            console.log(title)
        }
    }
}
