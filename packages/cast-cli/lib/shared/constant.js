"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HL_WEB_TYPES_JSON = exports.HL_ATTRIBUTES_JSON = exports.HL_TAGS_JSON = exports.HL_DIR = exports.HL_MD = exports.HL_TITLE_SLOTS_RE = exports.HL_TITLE_EVENTS_RE = exports.HL_TITLE_ATTRIBUTES_RE = exports.HL_API_RE = exports.HL_COMPONENT_NAME_RE = exports.JEST_STYLE_MOCK = exports.JEST_MEDIA_MOCK = exports.JEST_CONFIG = exports.SITE_EXAMPLE_GLOB = exports.SITE_DOCS_GLOB = exports.SITE_PUBLIC_PATH = exports.SITE_OUTPUT_PATH = exports.SITE_MOBILE_ROUTES = exports.SITE_PC_ROUTES = exports.SITE_CONFIG = exports.SITE_DIR = exports.SITE_PC_HTML = exports.SITE_PC_MAIN = exports.SITE_MOBILE_HTML = exports.SITE_MOBILE_MAIN = exports.PRIMARY_COLOR = exports.DOCS_DIR_NAME = exports.TESTS_DIR_NAME = exports.EXAMPLE_DIR_INDEX = exports.EXAMPLE_LOCALE_DIR_NAME = exports.EXAMPLE_DIR_NAME = exports.ESLINT_EXTENSIONS = exports.WEBPACK_RESOLVE_EXTENSIONS = exports.PUBLIC_DIR_INDEXES = exports.SCRIPTS_EXTENSIONS = exports.CLI_PACKAGE_JSON = exports.TEMPLATES_DIR = exports.ROOT_DOCS_DIR = exports.PACKAGE_JSON = exports.CAST_CONFIG = exports.POSTCSS_CONFIG = exports.TS_CONFIG = exports.STYLE_DIR_NAME = exports.TYPES_DIR = exports.UMD_DIR = exports.ES_DIR = exports.SRC_DIR = exports.CWD = void 0;
var path_1 = require("path");
exports.CWD = process.cwd();
exports.SRC_DIR = (0, path_1.resolve)(exports.CWD, 'src');
exports.ES_DIR = (0, path_1.resolve)(exports.CWD, 'es');
exports.UMD_DIR = (0, path_1.resolve)(exports.CWD, 'umd');
exports.TYPES_DIR = (0, path_1.resolve)(exports.CWD, 'types');
exports.STYLE_DIR_NAME = 'style';
exports.TS_CONFIG = (0, path_1.resolve)(exports.CWD, 'tsconfig.json');
exports.POSTCSS_CONFIG = (0, path_1.resolve)(exports.CWD, 'postcss.config.js');
exports.CAST_CONFIG = (0, path_1.resolve)(exports.CWD, 'cast.config.js');
exports.PACKAGE_JSON = (0, path_1.resolve)(exports.CWD, 'package.json');
exports.ROOT_DOCS_DIR = (0, path_1.resolve)(exports.CWD, 'docs');
exports.TEMPLATES_DIR = (0, path_1.resolve)(__dirname, '../../templates/sfc');
exports.CLI_PACKAGE_JSON = (0, path_1.resolve)(__dirname, '../../package.json');
exports.SCRIPTS_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
exports.PUBLIC_DIR_INDEXES = ['index.vue', 'index.tsx', 'index.ts', 'index.jsx', 'index.js'];
exports.WEBPACK_RESOLVE_EXTENSIONS = ['.js', '.jsx', '.vue', '.ts', '.tsx', '.css', '.scss', '.sass'];
exports.ESLINT_EXTENSIONS = ['.vue', '.ts', '.js', '.mjs', '.tsx', '.jsx'];
exports.EXAMPLE_DIR_NAME = 'example';
exports.EXAMPLE_LOCALE_DIR_NAME = 'locale';
exports.EXAMPLE_DIR_INDEX = 'index.vue';
exports.TESTS_DIR_NAME = '__tests__';
exports.DOCS_DIR_NAME = 'docs';
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
exports.SITE_OUTPUT_PATH = (0, path_1.resolve)(exports.CWD, 'site');
exports.SITE_PUBLIC_PATH = (0, path_1.resolve)(exports.CWD, 'public');
exports.SITE_DOCS_GLOB = (0, path_1.resolve)(exports.CWD, './docs/**');
exports.SITE_EXAMPLE_GLOB = (0, path_1.resolve)(exports.CWD, './src/**/example/**');
/* jest
-----------------------*/
exports.JEST_CONFIG = (0, path_1.resolve)(__dirname, '../config/jest.config.js');
exports.JEST_MEDIA_MOCK = (0, path_1.resolve)(__dirname, '../config/jest.media.mock.js');
exports.JEST_STYLE_MOCK = (0, path_1.resolve)(__dirname, '../config/jest.style.mock.js');
/* template
----------------*/
exports.HL_COMPONENT_NAME_RE = /.*(\/|\\)(.+)(\/|\\)docs(\/|\\)/;
exports.HL_API_RE = /##\s*API\n+/;
exports.HL_TITLE_ATTRIBUTES_RE = /###\s*属性\s*\n+/;
exports.HL_TITLE_EVENTS_RE = /###\s*事件\s*\n+/;
exports.HL_TITLE_SLOTS_RE = /###\s*插槽\s*\n+/;
exports.HL_MD = 'zh-CN.md';
exports.HL_DIR = (0, path_1.resolve)(exports.CWD, 'highlight');
exports.HL_TAGS_JSON = (0, path_1.resolve)(exports.HL_DIR, 'tags.json');
exports.HL_ATTRIBUTES_JSON = (0, path_1.resolve)(exports.HL_DIR, 'attributes.json');
exports.HL_WEB_TYPES_JSON = (0, path_1.resolve)(exports.HL_DIR, 'web-types.json');
