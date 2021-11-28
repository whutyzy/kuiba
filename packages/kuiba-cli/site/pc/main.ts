import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { get } from 'lodash'
// @ts-ignore
import routes from '@pc-routes'
// @ts-ignore
import config from '@config'
import '../style/main.scss'
import App from './App.vue'

const defaultLanguage = get(config, 'defaultLanguage')
const redirect = get(config, 'pc.redirect')
const mobileRedirect = get(config, 'mobile.redirect')

redirect && routes.push({ path: '/:pathMatch(.*)*', redirect: `/${defaultLanguage}${redirect}` })

const router = createRouter({ history: createWebHashHistory(), routes })

Object.defineProperty(window, 'onMobileRouteChange', {
    value: (path: string, language: string, replace: string) => {
        if (path === mobileRedirect) {
            router.replace(`/${language}/${replace}`)
            return
        }

        router.replace(`/${language}${path}`)
    }
})

const instance = createApp(App).use(router).mount('#app')

console.log(instance)
// createApp(App).mount('#app')
