import { ensureDir, readdirSync, readFileSync, writeFile } from 'fs-extra'
import { resolve } from 'path'
import { get } from 'lodash'
import {
    SRC_DIR,
    HL_MD,
    HL_API_RE,
    HL_COMPONENT_NAME_RE,
    HL_TITLE_ATTRIBUTES_RE,
    HL_TITLE_EVENTS_RE,
    HL_TITLE_SLOTS_RE,
    HL_WEB_TYPES_JSON,
    HL_DIR,
    HL_TAGS_JSON,
    HL_ATTRIBUTES_JSON
} from '../shared/constant'
import { isDir, isMD } from '../shared/fsUtils'
import { getCastConfig } from '../config/cast.config'

const TABLE_HEAD_RE = /\s*\|.*\|\s*\n\s*\|.*---+\s*\|\s*\n+/
const TABLE_FOOT_RE = /(\|\s*$)|(\|\s*\n(?!\s*\|))/

export const replaceDot = (s: string) => s.replace(/`/g, '')

export const replaceUnderline = (s: string) => s.replace(/_/g, '')

export function parseTable(table: string) {
    const rows = table.split('\n').filter(Boolean)
    return rows.map((row) => {
        const cols = row.split('|')
        cols.shift()
        cols.pop()
        return cols.map((col) => col.replace(/__varlet_axis__/g, '|').trim())
    })
}

export function compileTemplateHighlight() {

}