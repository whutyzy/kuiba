import { resolve } from 'path'

export const CWD = process.cwd()

export const SRC_DIR = resolve(CWD, 'src')
export const TS_CONFIG = resolve(CWD, 'tsconfig.json')
export const POSTCSS_CONFIG = resolve(CWD, 'postcss.config.js')
export const CAST_CONFIG = resolve(CWD, 'cast.config.js')
export const TEMPLATES_DIR = resolve(__dirname, '../../templates/sfc')
export const CLI_PACKAGE_JSON = resolve(__dirname, '../../package.json')
export const WEBPACK_RESOLVE_EXTENSIONS = ['.js', '.jsx', '.vue', '.ts', '.tsx', '.css', '.less']
export const ESLINT_EXTENSIONS = ['.vue', '.ts', '.js', '.mjs', '.tsx', '.jsx']
export const PRIMARY_COLOR = '#3a7afe'

/*  site
----------------------*/
export const SITE_MOBILE_MAIN = resolve(__dirname, '../../site/mobile/main.ts')
export const SITE_MOBILE_HTML = resolve(__dirname, '../../site/mobile/index.html')
export const SITE_PC_MAIN = resolve(__dirname, '../../site/pc/main.ts')
export const SITE_PC_HTML = resolve(__dirname, '../../site/pc/index.html')
export const SITE_DIR = resolve(CWD, '.cast/site')
export const SITE_CONFIG = resolve(CWD, '.cast/site.config.json')
export const SITE_PC_ROUTES = resolve(CWD, '.cast/pc.routes.ts')
export const SITE_MOBILE_ROUTES = resolve(CWD, '.cast/mobile.routes.ts')
export const SITE_OUTPUT_PATH = resolve(CWD, 'site')
export const SITE_PUBLIC_PATH = resolve(CWD, 'public')
