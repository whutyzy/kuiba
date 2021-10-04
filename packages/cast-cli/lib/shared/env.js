"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasProjectYarn = exports.hasYarn = void 0;
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var _hasYarn;
var hasYarn = function () {
    if (_hasYarn != null) {
        return _hasYarn;
    }
    try {
        (0, child_process_1.execSync)('yarn --version', { stdio: 'ignore' });
        return (_hasYarn = true);
    }
    catch (e) {
        return (_hasYarn = false);
    }
};
exports.hasYarn = hasYarn;
var hasProjectYarn = function (cwd) {
    var lockFile = path_1.default.join(cwd, 'yarn.lock');
    var result = fs_1.default.existsSync(lockFile);
    return checkYarn(result);
};
exports.hasProjectYarn = hasProjectYarn;
function checkYarn(result) {
    if (result && !(0, exports.hasYarn)())
        throw new Error("The project seems to require yarn but it's not installed.");
    return result;
}
