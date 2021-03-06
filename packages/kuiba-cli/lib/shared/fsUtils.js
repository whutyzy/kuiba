"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.smartAppendFileSync = exports.bigCamelize = exports.camelize = exports.outputFileSyncOnChange = exports.replaceExt = exports.isTSX = exports.isJSX = exports.isDir = exports.isScript = exports.isSFC = exports.isSass = exports.isMD = exports.isPublicDir = exports.getPublicDirs = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var constant_1 = require("../shared/constant");
function getPublicDirs() {
    return __awaiter(this, void 0, void 0, function () {
        var srcDir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, fs_extra_1.readdir)(constant_1.SRC_DIR)];
                case 1:
                    srcDir = _a.sent();
                    return [2 /*return*/, srcDir.filter(function (filename) { return (0, exports.isPublicDir)((0, path_1.resolve)(constant_1.SRC_DIR, filename)); })];
            }
        });
    });
}
exports.getPublicDirs = getPublicDirs;
var isPublicDir = function (dir) {
    return constant_1.PUBLIC_DIR_INDEXES.some(function (index) { return (0, fs_extra_1.pathExistsSync)((0, path_1.resolve)(dir, index)); });
};
exports.isPublicDir = isPublicDir;
var isMD = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.md'; };
exports.isMD = isMD;
var isSass = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && ['.scss', '.sass'].includes((0, path_1.extname)(file)); };
exports.isSass = isSass;
var isSFC = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.vue'; };
exports.isSFC = isSFC;
var isScript = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && constant_1.SCRIPTS_EXTENSIONS.includes((0, path_1.extname)(file)); };
exports.isScript = isScript;
function isDir(file) {
    return (0, fs_extra_1.pathExistsSync)(file) && (0, fs_extra_1.lstatSync)(file).isDirectory();
}
exports.isDir = isDir;
var isJSX = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.jsx'; };
exports.isJSX = isJSX;
var isTSX = function (file) { return (0, fs_extra_1.pathExistsSync)(file) && (0, path_1.extname)(file) === '.tsx'; };
exports.isTSX = isTSX;
var replaceExt = function (file, ext) { return file.replace((0, path_1.extname)(file), ext); };
exports.replaceExt = replaceExt;
function outputFileSyncOnChange(path, code) {
    (0, fs_extra_1.ensureFileSync)(path);
    var content = (0, fs_extra_1.readFileSync)(path, 'utf-8');
    if (content !== 'code') {
        (0, fs_extra_1.outputFileSync)(path, code);
    }
}
exports.outputFileSyncOnChange = outputFileSyncOnChange;
var camelize = function (s) { return s.replace(/-(\w)/g, function (_, p) { return p.toUpperCase(); }); };
exports.camelize = camelize;
var bigCamelize = function (s) { return (0, exports.camelize)(s).replace(s.charAt(0), s.charAt(0).toUpperCase()); };
exports.bigCamelize = bigCamelize;
function smartAppendFileSync(file, code) {
    if ((0, fs_extra_1.pathExistsSync)(file)) {
        var content = (0, fs_extra_1.readFileSync)(file, 'utf-8');
        if (!content.includes(code)) {
            (0, fs_extra_1.appendFileSync)(file, code);
        }
    }
}
exports.smartAppendFileSync = smartAppendFileSync;
