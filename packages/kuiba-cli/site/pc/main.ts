import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { get } from 'lodash'
// @ts-ignore
import routes from '@pc-routes'
// @ts-ignore
import config from '@config'

import App from './App.vue'

const defaultLanguage = get(config, 'defaultLanguage')
const redirect = get(config, 'pc.redirect')
const mobileRedirect = get(config, 'mobile.redirect')

redirect && routes.push({ path: '/:pathMatch(.*)*', redirect: `/${defaultLanguage}${redirect}` })


const router = createRouter({ history: createWebHashHistory(), routes })

createApp(App).use(router).mount('#app')
// createApp(App).mount('#app')
