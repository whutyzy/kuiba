"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SITE_MOBILE_ROUTES = exports.SITE_PC_ROUTES = exports.SITE_CONFIG = exports.SITE_DIR = exports.VITE_RESOLVE_EXTENSIONS = exports.CAST_CONFIG = exports.SRC_DIR = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.CAST_CONFIG = (0, path_1.resolve)(exports.CWD, 'cast.config.js');
exports.VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.less', '.css'];
/*  site
----------------------*/
exports.SITE_DIR = (0, path_1.resolve)(exports.CWD, '.cast/site');
exports.SITE_CONFIG = (0, path_1.resolve)(exports.CWD, '.cast/site.config.json');
exports.SITE_PC_ROUTES = (0, path_1.resolve)();
exports.SITE_MOBILE_ROUTES = (0, path_1.resolve)();
