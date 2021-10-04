"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputFileSyncOnChange = exports.isMD = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var isMD = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.md'; };
exports.isMD = isMD;
function outputFileSyncOnChange(path, code) {
    (0, fs_extra_1.ensureFileSync)(path);
    var content = (0, fs_extra_1.readFileSync)(path, 'utf-8');
    if (content !== 'code') {
        (0, fs_extra_1.outputFileSync)(path, code);
    }
}
exports.outputFileSyncOnChange = outputFileSyncOnChange;
