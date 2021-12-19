"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileTemplateHighlight = exports.parseTable = exports.replaceUnderline = exports.replaceDot = void 0;
var TABLE_HEAD_RE = /\s*\|.*\|\s*\n\s*\|.*---+\s*\|\s*\n+/;
var TABLE_FOOT_RE = /(\|\s*$)|(\|\s*\n(?!\s*\|))/;
var replaceDot = function (s) { return s.replace(/`/g, ''); };
exports.replaceDot = replaceDot;
var replaceUnderline = function (s) { return s.replace(/_/g, ''); };
exports.replaceUnderline = replaceUnderline;
function parseTable(table) {
    var rows = table.split('\n').filter(Boolean);
    return rows.map(function (row) {
        var cols = row.split('|');
        cols.shift();
        cols.pop();
        return cols.map(function (col) { return col.replace(/__varlet_axis__/g, '|').trim(); });
    });
}
exports.parseTable = parseTable;
function compileTemplateHighlight() {
}
exports.compileTemplateHighlight = compileTemplateHighlight;
