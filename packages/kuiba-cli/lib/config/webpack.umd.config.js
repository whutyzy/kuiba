"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUmdConfig = void 0;
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var path_1 = require("path");
var webpack_base_config_1 = require("./webpack.base.config");
var constant_1 = require("../shared/constant");
var kuiba_config_1 = require("./kuiba.config");
var lodash_1 = require("lodash");
function getUmdConfig() {
    var kuibaConfig = (0, kuiba_config_1.getKuibaConfig)();
    var name = (0, lodash_1.get)(kuibaConfig, 'name');
    return (0, webpack_merge_1.default)(webpack_base_config_1.BASE_CONFIG, {
        mode: 'production',
        entry: (0, path_1.resolve)(constant_1.ES_DIR, 'umdIndex.js'),
        output: {
            path: constant_1.UMD_DIR,
            filename: name.toLocaleLowerCase() + ".js",
            library: name,
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue'
            }
        }
    });
}
exports.getUmdConfig = getUmdConfig;
