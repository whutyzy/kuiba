<template>
    <div class="kuiba-image" :style="style">
        <div v-if="showLoading && loading" class="kuiba-image__loading">
            <slot name="loading"><span>加载中</span></slot>
        </div>
        <div v-if="showError && isLoadingFailed" class="kuiba-image__error">
            <slot name="error"><span>加载失败</span></slot>
        </div>

        <img
            v-if="src && !isLoadingFailed && !lazyload"
            :src="src"
            class="kuiba-image__img"
            :style="{ objectFit: fit }"
            :onLoad="onLoad"
            :onError="onError"
        />
        <img
            v-if="src && !isLoadingFailed && lazyload"
            v-lazyload="src"
            :src="src"
            class="kuiba-image__img"
            :style="{ objectFit: fit }"
            :onLoad="onLoad"
            :onError="onError"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, CSSProperties, PropType } from 'vue'
import Lazyload from '../lazyload'
import { addUnit } from '../utils/format/unit'
import { isDef } from '../utils/validate'

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

export default defineComponent({
    name: 'KuibaImage',
    props: {
        src: { type: String },
        fit: { type: String as PropType<ImageFit>, default: 'fill' },
        width: { type: [String, Number] },
        height: { type: [String, Number] },
        lazyload: { type: Boolean },
        showError: { type: Boolean, default: true },
        showLoading: { type: Boolean, default: true }
    },
    emits: ['load', 'error'],
    directives:{ Lazyload },
    setup(props, { emit }) {
        const loading = ref(!!props.src)
        const isLoadingFailed = ref(!props.src)
        const style = computed(() => {
            const style: CSSProperties = {}
            if (isDef(props.width)) {
                style.width = addUnit(props.width)
            }
            if (isDef(props.height)) {
                style.height = addUnit(props.height)
            }
            return style
        })

        watch(
            () => props.src,
            (newSrc) => {
                isLoadingFailed.value = !!newSrc
                loading.value = !newSrc
            }
        )

        const onLoad = (event?: Event) => {
            loading.value = false
            emit('load', event)
        }
        const onError = (event?: Event) => {
            isLoadingFailed.value = true
            loading.value = false
            emit('error', event)
        }
        return {
            style,
            loading,
            isLoadingFailed,
            onLoad,
            onError
        }
    }
})
</script>

<style lang="scss">
@import './image.scss';
</style>
