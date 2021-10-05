"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.getDevConfig = exports.getDevServerConfig = exports.HTML_WEBPACK_PLUGINS = void 0;
var lodash_1 = require("lodash");
var constant_1 = require("../shared/constant");
var path_1 = require("path");
var webpack_merge_1 = __importDefault(require("webpack-merge"));
var webpackbar_1 = __importDefault(require("webpackbar"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var cast_config_1 = require("./cast.config");
var webpack_base_config_1 = require("./webpack.base.config");
var castConfig = (0, cast_config_1.getCastConfig)();
exports.HTML_WEBPACK_PLUGINS = [
    new html_webpack_plugin_1.default(__assign({ template: constant_1.SITE_PC_HTML, filename: 'index.html' }, createHtmlPluginOptions('pc'))),
    new html_webpack_plugin_1.default(__assign({ template: constant_1.SITE_MOBILE_HTML, filename: 'mobile.html' }, createHtmlPluginOptions('mobile')))
];
function createHtmlPluginOptions(type) {
    return {
        hash: true,
        chunks: [type],
        title: (0, lodash_1.get)(castConfig, type + ".title[" + (0, lodash_1.get)(castConfig, 'defaultLanguage') + "]"),
        logo: (0, lodash_1.get)(castConfig, "logo"),
        baidu: (0, lodash_1.get)(castConfig, "analysis.baidu", '')
    };
}
function getDevServerConfig() {
    var host = (0, lodash_1.get)(castConfig, 'host');
    return {
        port: (0, lodash_1.get)(castConfig, 'port'),
        host: host === 'localhost' ? '0.0.0.0' : host,
        static: {
            directory: (0, path_1.resolve)(constant_1.CWD, 'public')
        },
        allowedHosts: 'all',
        hot: true
    };
}
exports.getDevServerConfig = getDevServerConfig;
function getDevConfig() {
    return (0, webpack_merge_1.default)(webpack_base_config_1.BASE_CONFIG, {
        mode: 'development',
        devtool: 'source-map',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    chunks: {
                        chunks: 'all',
                        minChunks: 2,
                        minSize: 0,
                        name: 'chunks'
                    }
                }
            }
        },
        plugins: __spreadArray([
            new webpackbar_1.default({
                name: 'Site development building',
                color: constant_1.PRIMARY_COLOR
            })
        ], __read(exports.HTML_WEBPACK_PLUGINS), false)
    });
}
exports.getDevConfig = getDevConfig;
