"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var execa_1 = __importDefault(require("execa"));
function executeCommand(command, args, cwd) {
    return new Promise(function (resolve, reject) {
        var child = (0, execa_1.default)(command, args, {
            cwd: cwd,
            stdio: ['inherit', 'pipe', 'inherit']
        });
        child.stdout.on('data', function (buffer) {
            var str = buffer.toString();
            if (/warning/.test(str)) {
                return;
            }
            process.stdout.write(buffer);
        });
        child.on('close', function (code) {
            if (code !== 0) {
                reject(new Error("command failed: " + command));
                return;
            }
            resolve();
        });
    });
}
exports.default = executeCommand;
