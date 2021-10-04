"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SITE_MOBILE_ROUTES = exports.SITE_PC_ROUTES = exports.SITE_CONFIG = exports.SITE_DIR = exports.VITE_RESOLVE_EXTENSIONS = exports.CLI_PACKAGE_JSON = exports.GENERATORS_DIR = exports.CAST_CONFIG = exports.SRC_DIR = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.CAST_CONFIG = (0, path_1.resolve)(exports.CWD, 'cast.config.js');
exports.GENERATORS_DIR = (0, path_1.resolve)(__dirname, '../../generators/sfc');
exports.CLI_PACKAGE_JSON = (0, path_1.resolve)(__dirname, '../../package.json');
exports.VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.less', '.css'];
/*  site
----------------------*/
exports.SITE_DIR = (0, path_1.resolve)(exports.CWD, '.cast/site');
exports.SITE_CONFIG = (0, path_1.resolve)(exports.CWD, '.cast/site.config.json');
exports.SITE_PC_ROUTES = (0, path_1.resolve)();
exports.SITE_MOBILE_ROUTES = (0, path_1.resolve)();
