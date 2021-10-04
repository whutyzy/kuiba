const chalk = require('chalk')
const stripAnsi = require('strip-ansi')
const readline = require('readline')

const format = (label: string, msg: string) => msg.split('\n').map((line, i) => (i === 0
    ? `${label} ${line}`
    : line.padStart(stripAnsi(label).length))).join('\n')

const chalkTag = (msg:string) => chalk.bgBlackBright.white.dim(` ${msg} `)

exports.log = (msg = '', tag = null) => {
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg)
}

exports.info = (msg: string, tag = null) => {
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg))
}

exports.warn = (msg: string, tag = null) => {
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)))
}

exports.error = (msg:string|Error, tag = null) => {
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)))
    if (msg instanceof Error) {
        console.error(msg.stack)
    }
}

exports.clearConsole = (title:string) => {
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
