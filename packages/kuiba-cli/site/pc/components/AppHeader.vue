<template>
    <div class="kuiba-site-header">
        <div class="kuiba-site-header__lead">
            <img v-if="logo" :src="logo" alt="" class="kuiba-site-header__logo" />
            <h4 class="kuiba-site-header__title">{{ title }}</h4>
        </div>
        <div class="luiba-site-header__tail">
            <a v-if="github" :href="github" class="kuiba-site-header__link">
                <svg
                    height="32"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="32"
                    data-view-component="true"
                    class="octicon octicon-mark-github v-align-middle"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                    ></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
// @ts-ignore
import config from '@config'
import { get } from 'lodash'
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
    setup() {
        const title: Ref<string> = ref(get(config, 'title'))
        const logo: Ref<string> = ref(get(config, 'logo'))
        const github: Ref<string> = ref(get(config, 'pc.header.github'))

        return {
            logo,
            title,
            github
        }
    },

    computed: {},

    methods: {}
})
</script>
<style lang="scss" scoped>
.kuiba-site-header {
    display: flex;
    box-sizing: border-box;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background-color: #fff;
    &__lead {
        display: flex;
        align-items: center;
    }
    &__title {
        font-size: 24px;
    }
    &__logo {
        margin-right: 16px;
        width: 32px;
        flex-shrink: 0;
    }
}
</style>
