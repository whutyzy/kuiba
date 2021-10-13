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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var path_2 = require("path");
var constant_1 = require("../shared/constant");
var PackageManager_1 = __importDefault(require("../services/PackageManager"));
var logger_1 = require("../shared/logger");
var clearConsole_1 = __importDefault(require("../shared/clearConsole"));
function generatePackageJSON(name) {
    var filePath = (0, path_2.resolve)(constant_1.CWD, name, 'package.json');
    var pkg = JSON.parse(fs_extra_1.default.readFileSync(filePath, 'utf-8'));
    var cliPkg = JSON.parse(fs_extra_1.default.readFileSync(constant_1.CLI_PACKAGE_JSON, 'utf-8'));
    pkg.devDependencies['@cast/cli'] = "^" + cliPkg.version;
    pkg.name = name;
    pkg.files = ['es', 'umd', 'highlight', 'types', 'README.md'];
    fs_extra_1.default.writeFileSync(filePath, JSON.stringify(pkg, null, 2));
}
function create(name) {
    return __awaiter(this, void 0, void 0, function () {
        var targetDir, action, pm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDir = path_1.default.join(process.cwd(), name);
                    if (!fs_extra_1.default.existsSync(targetDir)) return [3 /*break*/, 3];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                message: 'Target directory already ex, pick an action',
                                name: 'action',
                                choices: [
                                    { name: 'Overwrite', value: 'ooverwrite' },
                                    { name: 'Merged', value: 'merged' }
                                ]
                            }
                        ])];
                case 1:
                    action = (_a.sent()).action;
                    if (!(action === 'overwrite')) return [3 /*break*/, 3];
                    return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, fs_extra_1.default.copy(constant_1.TEMPLATES_DIR, targetDir)];
                case 4:
                    _a.sent();
                    generatePackageJSON(name);
                    pm = new PackageManager_1.default(targetDir, 'yarn');
                    return [4 /*yield*/, pm.install()];
                case 5:
                    _a.sent();
                    (0, clearConsole_1.default)();
                    (0, logger_1.success)('\n依赖下载完成! 执行下列命令开始开发：\n');
                    (0, logger_1.log)("cd " + name + "\n");
                    (0, logger_1.log)("yarn dev");
                    return [2 /*return*/];
            }
        });
    });
}
exports.create = create;
