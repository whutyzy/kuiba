"use strict";
var chalk = require('chalk');
var stripAnsi = require('strip-ansi');
var readline = require('readline');
var format = function (label, msg) { return msg.split('\n').map(function (line, i) { return (i === 0
    ? label + " " + line
    : line.padStart(stripAnsi(label).length)); }).join('\n'); };
var chalkTag = function (msg) { return chalk.bgBlackBright.white.dim(" " + msg + " "); };
exports.log = function (msg, tag) {
    if (msg === void 0) { msg = ''; }
    if (tag === void 0) { tag = null; }
    tag ? console.log(format(chalkTag(tag), msg)) : console.log(msg);
};
exports.info = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.log(format(chalk.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg));
};
exports.warn = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.warn(format(chalk.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk.yellow(msg)));
};
exports.error = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.error(format(chalk.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk.red(msg)));
    if (msg instanceof Error) {
        console.error(msg.stack);
    }
};
exports.clearConsole = function (title) {
    if (process.stdout.isTTY) {
        var blank = '\n'.repeat(process.stdout.rows);
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        if (title) {
            console.log(title);
        }
    }
};
