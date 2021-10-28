<template>
    <div :class="['kuiba-loading', `kuiba-loading--${type}`]">
        <span :class="['kuiba-loading__spinner', `kuiba-loading__spinner--${type}`]" :style="spinnerStyle">
            <svg v-if="type === 'circle'" :class="`kuiba-loading__${type}`" viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
            <template v-else>
                <i v-for="i in 12" :key="i" :class="['kuiba-loading__line', `kuiba-loading__line--${i}`]"></i>
            </template>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { getSizeStyle } from '../utils/format/unit'
export default defineComponent({
    name: 'KuibaLoading',
    props: {
        type: {
            type: String as PropType<'circle' | 'spinner'>,
            default: 'circle'
        },
        size: {
            type: [Number, String]
        },
        color: {
            type: String,
            default: 'currentColor'
        }
    },
    setup(props) {
        const spinnerStyle = computed(() => {
            return Object.assign({ color: props.color }, getSizeStyle(props.size))
        })

        return { spinnerStyle }
    }
})
</script>

<style lang="scss">
@import './loading.scss';
</style>
