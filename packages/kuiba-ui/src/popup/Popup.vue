<template>
    <div v-show="visible" class="kuiba-popup">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent,PropType,CSSProperties } from 'vue'
import { truthProp, unknownProp } from '../utils'
export default defineComponent({
    name: 'KuibaPopup',
    props: {
        visible: truthProp,
        zIndex: [Number, String],
        duration: [Number, String],
        className: unknownProp,
        lockScroll: truthProp,
        customStyle: Object as PropType<CSSProperties>
    }
})
</script>

<style lang="scss">
@import './popup.scss';
</style>
