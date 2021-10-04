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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var execa_1 = __importDefault(require("execa"));
var env_1 = require("../shared/env");
var executeCommand_1 = __importDefault(require("../shared/executeCommand"));
var logger_1 = require("../shared/logger");
var PACKAGE_MANAGER_CONFIG = {
    npm: {
        install: ['install']
    },
    yarn: {
        install: []
    }
};
var PackageManager = /** @class */ (function () {
    function PackageManager(context, packageManager) {
        this.bin = 'yarn';
        this.context = context;
        this._registries = {};
        if (packageManager) {
            this.bin = packageManager;
        }
        else if (context) {
            if ((0, env_1.hasProjectYarn)(context)) {
                this.bin = 'yarn';
            }
            else {
                this.bin = 'npm';
            }
        }
    }
    // Any command that implemented registry-related feature should support
    // `-r` / `--registry` option
    PackageManager.prototype.setRegistry = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cacheKey, registry, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = '';
                        if (this._registries[cacheKey]) {
                            return [2 /*return*/, this._registries[cacheKey]];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 6]);
                        if (!(!registry || registry === 'undefined')) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, execa_1.default)(this.bin, ['config', 'get', 'registry'])];
                    case 2:
                        registry = (_a.sent()).stdout;
                        _a.label = 3;
                    case 3: return [3 /*break*/, 6];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, (0, execa_1.default)(this.bin, ['config', 'get', 'npmRegistryServer'])];
                    case 5:
                        // Yarn 2 uses `npmRegistryServer` instead of `registry`
                        registry = (_a.sent()).stdout;
                        return [3 /*break*/, 6];
                    case 6:
                        this._registries[cacheKey] = registry.trim();
                        return [2 /*return*/, this._registries[cacheKey]];
                }
            });
        });
    };
    PackageManager.prototype.runCommand = function (command, args) {
        return __awaiter(this, void 0, void 0, function () {
            var prevNodeEnv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevNodeEnv = process.env.NODE_ENV;
                        // In the use case of Vue CLI, when installing dependencies,
                        // the `NODE_ENV` environment variable does no good;
                        // it only confuses users by skipping dev deps (when set to `production`).
                        delete process.env.NODE_ENV;
                        // const registry = await this.setRegistry()
                        return [4 /*yield*/, (0, executeCommand_1.default)(this.bin, __spreadArray(__spreadArray([], __read(PACKAGE_MANAGER_CONFIG[this.bin][command]), false), __read((args || [])), false), this.context)];
                    case 1:
                        // const registry = await this.setRegistry()
                        _a.sent();
                        if (prevNodeEnv) {
                            process.env.NODE_ENV = prevNodeEnv;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageManager.prototype.install = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, logger_1.log)('\n正在下载依赖...\n');
                        return [4 /*yield*/, this.runCommand('install')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return PackageManager;
}());
exports.default = PackageManager;
