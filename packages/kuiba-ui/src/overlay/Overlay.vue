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
import { defineComponent, PropType, CSSProperties } from 'vue'

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
        let { customStyle, zIndex } = props

        const style = extend(getZIndexStyle(zIndex), customStyle)
        const preventTouchMove = (event: TouchEvent) => {
            preventDefault(event, true)
        }
        if (isDef(props.duration)) {
            style.animationDuration = `${props.duration}s`
        }
        return { style, preventTouchMove, noop }
    }
})
</script>

<style lang="scss">
@import '../style/animation.scss';
@import './overlay.scss';
</style>
