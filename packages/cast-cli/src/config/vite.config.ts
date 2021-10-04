import { VITE_RESOLVE_EXTENSIONS } from './../shared/constant';
import { InlineConfig, PluginOption } from 'vite'
import { SITE_DIR } from '../shared/constant'
import {get} from 'lodash'
export function getDevConfig(castConfig: Record<string, any>): InlineConfig {
    const defaultLanguage = get(castConfig, 'defaultLanguage')
    const host = get(castConfig, 'host')
    return {
        root: SITE_DIR,
        resolve: {
            extensions: VITE_RESOLVE_EXTENSIONS,
            alias: {
                '@config': SITE_CONFIG,
                '@pc-routes': SITE_PC_ROUTES,
                '@mobile-routes': SITE_MOBILE_ROUTES
            }
        }
    }
}
