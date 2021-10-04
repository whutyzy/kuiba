import { resolve } from 'path'

export const CWD = process.cwd()
export const SRC_DIR = resolve(CWD, 'src')
export const CAST_CONFIG = resolve(CWD, 'cast.config.js')
export const VITE_RESOLVE_EXTENSIONS = ['.vue', '.tsx', '.ts', '.jsx', '.js', '.less', '.css']

/*  site
----------------------*/
export const SITE_DIR = resolve(CWD, '.cast/site')
export const SITE_CONFIG = resolve(CWD, '.cast/site.config.json')
export const SITE_PC_ROUTES = resolve()
export const SITE_MOBILE_ROUTES = resolve()
