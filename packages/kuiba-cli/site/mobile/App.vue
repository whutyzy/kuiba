<template>
    <div class="mobile-site">
        <header class="mobile-site-header">
            <div class="mobile-site-header__icon">
                <i @click="back" v-show="showBackIcon" class="kuiba-icon kuiba-icon-arrow-left"></i>
            </div>
            <div class="mobile-site-header__title">{{ title }}</div>
            <div class="mobile-site-header__menu"></div>
        </header>
        <div class="mobile-site-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import { useRoute } from 'vue-router'
import { defineComponent, ref, watch } from 'vue'
import { get } from 'lodash'
import { bigCamelize } from '../utils'

import type { Ref } from 'vue'
export default defineComponent({
    setup() {
        const title: Ref<string> = ref('')
        const showBackIcon: Ref<boolean> = ref(false)
        const redirect = get(config, 'mobile.redirect', '')
        const route = useRoute()
        const language: Ref<string> = ref('zh-CN')
        watch(
            () => route.path,
            (to) => {
                title.value = bigCamelize(to.slice(1))
                showBackIcon.value = title.value !== bigCamelize(redirect.slice(1))
            }
        )
        const back = () => {
            window.location.href = `./mobile.html#${redirect}?language=${language.value}&replace=${redirect.slice(1)}`
        }
        return { title, showBackIcon, back }
    }
})
</script>
<style lang="scss" scoped>
@import '../style/var.scss';

body {
    background-color: #fff !important;
}
.mobile-site-header {
    position: fixed;
    z-index: 99;
    width: 100%;
    display: flex;
    align-items: center;
    background-color: $primary-color;
    height: 48px;
    color: #fff;
    &__icon,
    &__menu {
        flex-shrink: 0;
        width: 48px;
    }
    &__icon {
        text-align: center;
        .kuiba-icon {
            font-size: 24px;
        }
    }
    &__title {
        font-size: 22px;
        flex: 1;
        text-align: center;
        line-height: 48px;
    }
}
.mobile-site-container {
    padding: 48px 12px 15px;
}
</style>
