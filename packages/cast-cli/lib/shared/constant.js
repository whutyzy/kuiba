"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SITE_MOBILE_ROUTES = exports.SITE_PC_ROUTES = exports.SITE_CONFIG = exports.SITE_DIR = exports.SITE_PC_HTML = exports.SITE_PC_MAIN = exports.SITE_MOBILE_HTML = exports.SITE_MOBILE_MAIN = exports.PRIMARY_COLOR = exports.WEBPACK_RESOLVE_EXTENSIONS = exports.CLI_PACKAGE_JSON = exports.TEMPLATES_DIR = exports.CAST_CONFIG = exports.POSTCSS_CONFIG = exports.TS_CONFIG = exports.SRC_DIR = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.TS_CONFIG = (0, path_1.resolve)(exports.CWD, 'tsconfig.json');
exports.POSTCSS_CONFIG = (0, path_1.resolve)(exports.CWD, 'postcss.config.js');
exports.CAST_CONFIG = (0, path_1.resolve)(exports.CWD, 'cast.config.js');
exports.TEMPLATES_DIR = (0, path_1.resolve)(__dirname, '../../templates/sfc');
exports.CLI_PACKAGE_JSON = (0, path_1.resolve)(__dirname, '../../package.json');
exports.WEBPACK_RESOLVE_EXTENSIONS = ['.js', '.jsx', '.vue', '.ts', '.tsx', '.css', '.less'];
exports.PRIMARY_COLOR = '#3a7afe';
/*  site
----------------------*/
exports.SITE_MOBILE_MAIN = (0, path_1.resolve)(__dirname, '../../site/mobile/main.ts');
exports.SITE_MOBILE_HTML = (0, path_1.resolve)(__dirname, '../../site/mobile/index.html');
exports.SITE_PC_MAIN = (0, path_1.resolve)(__dirname, '../../site/pc/main.ts');
exports.SITE_PC_HTML = (0, path_1.resolve)(__dirname, '../../site/pc/index.html');
exports.SITE_DIR = (0, path_1.resolve)(exports.CWD, '.cast/site');
exports.SITE_CONFIG = (0, path_1.resolve)(exports.CWD, '.cast/site.config.json');
exports.SITE_PC_ROUTES = (0, path_1.resolve)(exports.CWD, '.cast/pc.routes.ts');
exports.SITE_MOBILE_ROUTES = (0, path_1.resolve)(exports.CWD, '.cast/mobile.routes.ts');
