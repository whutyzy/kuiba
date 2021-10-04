"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDevConfig = void 0;
var constant_1 = require("./../shared/constant");
var constant_2 = require("../shared/constant");
var lodash_1 = require("lodash");
function getDevConfig(castConfig) {
    var defaultLanguage = (0, lodash_1.get)(castConfig, 'defaultLanguage');
    var host = (0, lodash_1.get)(castConfig, 'host');
    return {
        root: constant_2.SITE_DIR,
        resolve: {
            extensions: constant_1.VITE_RESOLVE_EXTENSIONS,
            alias: {
                '@config': constant_2.SITE_CONFIG,
                '@pc-routes': constant_2.SITE_PC_ROUTES,
                '@mobile-routes': constant_2.SITE_MOBILE_ROUTES
            }
        }
    };
}
exports.getDevConfig = getDevConfig;
