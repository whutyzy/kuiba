<template>
  <i :class="iconClass" :style="iconStyle"></i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { isNumber } from '../utils/shared'

export default defineComponent({
  name: 'KuibaIcon',
  props: {
    name: { type: String },
    color: { type: String, default: '#323233' },
    size: { type: [String, Number], default: '12px' },
    classPrefix: { type: String, default: 'kuiba-icon' },
  },
  setup(props) {
    const { name, color, size, classPrefix } = props
    const iconClass = computed(() => `${classPrefix} ${classPrefix}-${name}`)
    const iconStyle = computed(() => ({ color, 'font-size': isNumber(size) ? size + 'px' : size }))

    return { iconClass, iconStyle }
  },
})
</script>

<style lang="scss">
.kuiba-icon {
  display: inline-block;
  position: relative;
}
</style>
