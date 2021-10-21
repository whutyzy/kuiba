<template>
    <div class="kuiba-site">
        <app-header />
        <div class="kuiba-site__content">
            <app-sidebar
                :menu="menu"
                :language="language"
                :menuName="menuName"
                @change="handleSidebarChange"
            ></app-sidebar>
            <div ref="doc" class="kuiba-site-doc__container">
                <router-view />
            </div>
            <app-mobile v-show="useMobile" :componentName="componentName" :language="language" :replace="menuName">
            </app-mobile>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { defineComponent, ref, nextTick, onMounted, watch } from 'vue'
import { get } from 'lodash'
import AppMobile from './components/AppMobile.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import { MenuTypes, getPCLocationInfo, isPhone } from '../utils'

import type { Ref } from 'vue'
type Language = Record<string, string>

export interface Menu {
    doc: string
    text: Record<string, string>
    type: MenuTypes
}

export default defineComponent({
    components: { AppMobile, AppHeader, AppSidebar },
    setup() {
        const defaultLanguage = get(config, 'defaultLanguage')
        const useMobile = ref(get(config, 'useMobile'))
        const menu: Ref<Menu[]> = ref(get(config, 'pc.menu', []))
        const language: Ref<string> = ref('')
        const menuName: Ref<string> = ref('')

        const doc: Ref<HTMLElement | null> = ref(null)
        const mobileRedirect = get(config, 'mobile.redirect')
        const componentName: Ref<null | string> = ref(null)

        const route = useRoute()
        const router = useRouter()
        const getComponentNameByMenuName = (menuName: string) => {
            const currentMenu = menu.value.find((menu) => menu.doc === menuName)
            return currentMenu?.type === MenuTypes.COMPONENT ? menuName : mobileRedirect.slice(1)
        }
        const init = () => {
            const { language, menuName } = getPCLocationInfo()
            if (isPhone() && useMobile.value) {
                window.location.href = `./mobile.html#/${menuName}?language=${
                    language || defaultLanguage
                }&platform=mobile`
                return
            }

            nextTick(() => {
                const children = document
                    .querySelector('.kuiba-site-sidebar')
                    .querySelectorAll('.kuiba-site-sidebar__item')
                const index = menu.value.findIndex((item) => item.doc === menuName)
                if (index !== -1) {
                    children[index].scrollIntoView({ block: 'center', inline: 'start' })
                }
            })
        }
        onMounted(init)
        watch(
            () => route.path,
            () => {
                const { language: lang, menuName: _menuName } = getPCLocationInfo()
                if (!lang || !_menuName) {
                    return
                }

                componentName.value = getComponentNameByMenuName(_menuName)
                menuName.value = _menuName
                language.value = lang
                document.title = get(config, 'pc.title')[lang]
            },
            { immediate: true }
        )
        const handleSidebarChange = (menu: Menu) => {
            menuName.value = menu.doc
            doc.value.scrollTop = 0
            componentName.value = getComponentNameByMenuName(menu.doc)
        }
        return { menu, handleSidebarChange, language, menuName, componentName, doc, useMobile }
    }
})
</script>
<style lang="scss" scoped>
.kuiba-site__content {
    display: flex;
    margin: 60px 0 0 220px;
}
.kuiba-site-doc__container {
    flex: 1 0 0;
    overflow-y: auto;
    min-width: 550px;
    box-sizing: border-box;
    padding: 24px 30px;
}
</style>
