"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSass = exports.extractStyleDependencies = exports.normalizeStyleDependency = exports.clearEmptyLine = exports.STYLE_IMPORT_RE = exports.IMPORT_SASS_RE = exports.IMPORT_CSS_RE = exports.EMPTY_LINE_RE = void 0;
var fs_extra_1 = require("fs-extra");
var path_1 = __importDefault(require("path"));
var sass_1 = __importDefault(require("sass"));
var fsUtils_1 = require("../shared/fsUtils");
var EMPTY_SPACE_RE = /[\s]+/g;
exports.EMPTY_LINE_RE = /[\n\r]*/g;
exports.IMPORT_CSS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.css)['"]\s*;?(?!\s*['"`])/g;
exports.IMPORT_SASS_RE = /(?<!['"`])import\s+['"](\.{1,2}\/.+\.s[ac]ss)['"]\s*;?(?!\s*['"`])/g;
exports.STYLE_IMPORT_RE = /@import\s+['"](.+)['"]\s*;/g;
var clearEmptyLine = function (s) { return s.replace(exports.EMPTY_LINE_RE, '').replace(EMPTY_SPACE_RE, ' '); };
exports.clearEmptyLine = clearEmptyLine;
function normalizeStyleDependency(styleImport, reg) {
    var relativePath = styleImport.replace(reg, '$1');
    relativePath = relativePath.replace(/(\.sass)|(\.scss)|(\.css)/, '');
    if (relativePath.startsWith('~')) {
        return relativePath;
    }
    if (relativePath.startsWith('./')) {
        return '.' + relativePath;
    }
    return '../' + relativePath;
}
exports.normalizeStyleDependency = normalizeStyleDependency;
function extractStyleDependencies(file, code, reg, expect, self) {
    var _a;
    var _b = path_1.default.parse(file), dir = _b.dir, base = _b.base;
    var styleImports = (_a = code.match(reg)) !== null && _a !== void 0 ? _a : [];
    var cssFile = path_1.default.resolve(dir, './style/index.js');
    var sassFile = path_1.default.resolve(dir, './style/scss.scss');
    styleImports.forEach(function (styleImport) {
        var normalizedPath = normalizeStyleDependency(styleImport, reg);
        (0, fsUtils_1.smartAppendFileSync)(cssFile, "import '" + normalizedPath + ".css'\n");
        (0, fsUtils_1.smartAppendFileSync)(sassFile, "@import '" + normalizedPath + "." + expect + "';\n");
    });
    if (self) {
        (0, fsUtils_1.smartAppendFileSync)(cssFile, "import '" + normalizeStyleDependency(base, reg) + ".css'\n");
        (0, fsUtils_1.smartAppendFileSync)(sassFile, "@import '" + normalizeStyleDependency(base, reg) + "." + expect + "';\n");
    }
    return code.replace(reg, '');
}
exports.extractStyleDependencies = extractStyleDependencies;
function scssImporterPlugin(url, prev) {
    if (url.startsWith('~')) {
        url = path_1.default.resolve(process.cwd(), 'node_modules', url.replace('~', ''));
    }
    return { file: url };
}
function compileSass(file) {
    var css = sass_1.default.renderSync({ file: file, importer: scssImporterPlugin, includePaths: ['./node_modules'] }).css;
    (0, fs_extra_1.writeFileSync)((0, fsUtils_1.replaceExt)(file, '.css'), (0, exports.clearEmptyLine)(css.toString()), 'utf-8');
}
exports.compileSass = compileSass;
