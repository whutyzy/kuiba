import { createApp } from 'vue'
// @ts-ignore
import routes from '@mobile-routes'
// @ts-ignore
import config from '@config'
import { get } from 'lodash'
import { createRouter, createWebHashHistory } from 'vue-router'
import { isPhone, inIframe } from '../utils'

import '../style/main.scss'
import App from './App.vue'

const redirect = get(config, 'mobile.redirect')
const defaultLanguage = get(config, 'defaultLanguage')

redirect &&
    routes.push({
        path: '/:pathMatch(.*)',
        redirect
    })
routes.push({
    path: '/home',
    component: () => import('./components/AppHome.vue')
})

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: (to, from, savedPosition) => savedPosition || { left: 0, top: 0 },
    routes
})

router.beforeEach((to) => {
    const language = to.query.language ?? defaultLanguage
    const path = to.path
    const replace = to.query.replace
    if (!isPhone() && inIframe()) {
        window.top.onMobileRouteChange(path, language, replace)
    }
})

createApp(App).use(router).mount('#app')
