"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCastConfig = void 0;
var fs_extra_1 = require("fs-extra");
var lodash_1 = require("lodash");
var constant_1 = require("../shared/constant");
var fsUtils_1 = require("../shared/fsUtils");
function getCastConfig() {
    var config = {};
    if ((0, fs_extra_1.pathExistsSync)(constant_1.CAST_CONFIG)) {
        config = require(constant_1.CAST_CONFIG);
    }
    var defaultConfigPath = '../../cast.default.config.js';
    delete require.cache[require.resolve(defaultConfigPath)];
    var defaultConfig = require(defaultConfigPath);
    var mergedConfig = (0, lodash_1.merge)(defaultConfig, config);
    var source = JSON.stringify(mergedConfig, null, 2);
    (0, fsUtils_1.outputFileSyncOnChange)(constant_1.SITE_CONFIG, source);
    return mergedConfig;
}
exports.getCastConfig = getCastConfig;
