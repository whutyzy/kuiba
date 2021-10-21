<template>
    <div class="logo-box">
        <h1>
            <span class="logo-box__title">{{ title }}</span>
            <img :src="logo" class="logo-box__img" />
        </h1>
        <h2 class="logo-box__desc">{{ description }}</h2>
    </div>
    <div class="componemt-menu">
        <div v-for="component in components" @click="toComponent(component.doc)" class="component-menu__item">
            <span>{{ component.text[lang] }}</span>
            <i class="kuiba-icon kuiba-icon-arrow-right"></i>
        </div>
    </div>
</template>

<script>
import config from '@config'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { get } from 'lodash'

export default {
    name: 'AppHome',
    setup() {
        const title = ref(get(config, 'title'))
        const logo = ref(get(config, 'logo'))
        const description = ref(get(config, 'mobile.description'))
        const menu = ref(get(config, 'pc.menu', []))
        const lang = ref('zh-CN')
        const configComponents = menu.value.filter((item) => item.type === 2)
        const components = reactive(configComponents)
        const router = useRouter()
        const toComponent = (component) => {
            router.push({ path: `/${component}`, query: { language: lang.value, replace: component.doc } })
        }
        return { title, logo, description, components, lang, toComponent }
    }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
.logo-box {
    padding: 24px 0 0 16px;
    &__img {
        position: relative;
        top: -5px;
        width: 48px;
        height: auto;
    }
    &__desc {
        padding-bottom: 24px;
        color: #455a6499;
        font-size: 14px;
    }
    h1 {
        display: flex;
        align-items: center;
    }
}
.component-menu {
    &__item {
        display: flex;
        justify-content: space-between;
        padding: 10px 16px;
        cursor: pointer;
        transition: all 0.3s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #555;
        line-height: 20px;
        font-size: 14px;
        &:hover {
            color: $primary-color;
        }
    }
}
</style>
