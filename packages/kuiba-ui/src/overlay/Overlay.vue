<template>
    <transition name="kuiba-fade">
        <div
            v-show="visible"
            :class="['kuiba-overlay']"
            :style="style"
            @ouchmove="lockScroll ? preventTouchMove : noop"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, CSSProperties } from 'vue'

import { getZIndexStyle, extend, noop, preventDefault, truthProp, unknownProp, isDef } from '../utils'
export default defineComponent({
    name: 'KuibaOverlay',
    props: {
        visible: Boolean,
        zIndex: [Number, String],
        duration: [Number, String],
        className: unknownProp,
        lockScroll: truthProp,
        customStyle: Object as PropType<CSSProperties>
    },
    setup(props) {
        const style = computed(() => {
            const _style = extend(getZIndexStyle(props.zIndex), props.customStyle)
            if (isDef(props.duration)) {
                _style.animationDuration = `${props.duration}s`
            }
            return  _style
        })
        const preventTouchMove = (event: TouchEvent) => {
            preventDefault(event, true)
        }

        return { style, preventTouchMove, noop }
    }
})
</script>

<style lang="scss">
@import '../style/animation.scss';
@import './overlay.scss';
</style>
