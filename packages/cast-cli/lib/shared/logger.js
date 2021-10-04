"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearConsole = exports.error = exports.warn = exports.info = exports.log = void 0;
var chalk_1 = __importDefault(require("chalk"));
var readline_1 = __importDefault(require("readline"));
var chalkTag = function (msg) { return chalk_1.default.bgBlackBright.white.dim(" " + msg + " "); };
var log = function (msg, tag) {
    if (msg === void 0) { msg = ''; }
    if (tag === void 0) { tag = null; }
    tag ? console.log(chalkTag(tag), msg) : console.log(msg);
};
exports.log = log;
var info = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.log(chalk_1.default.bgBlue.black(' INFO ') + (tag ? chalkTag(tag) : ''), msg);
};
exports.info = info;
var warn = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.warn(chalk_1.default.bgYellow.black(' WARN ') + (tag ? chalkTag(tag) : ''), chalk_1.default.yellow(msg));
};
exports.warn = warn;
var error = function (msg, tag) {
    if (tag === void 0) { tag = null; }
    console.error(chalk_1.default.bgRed(' ERROR ') + (tag ? chalkTag(tag) : ''), chalk_1.default.red(msg));
    if (msg instanceof Error) {
        console.error(msg.stack);
    }
};
exports.error = error;
var clearConsole = function (title) {
    if (process.stdout.isTTY) {
        var blank = '\n'.repeat(process.stdout.rows);
        console.log(blank);
        readline_1.default.cursorTo(process.stdout, 0, 0);
        readline_1.default.clearScreenDown(process.stdout);
        if (title) {
            console.log(title);
        }
    }
};
exports.clearConsole = clearConsole;
