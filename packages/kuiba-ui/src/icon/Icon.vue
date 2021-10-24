<template>
  <i :class="iconClass" :style="iconStyle"></i>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { addUnit } from '../utils/format/unit'

export default defineComponent({
  name: 'KuibaIcon',
  props: {
    name: { type: String },
    color: { type: String },
    size: { type: [String, Number] },
    classPrefix: { type: String, default: 'kuiba-icon' },
  },
  setup(props) {
    const { name, color, size, classPrefix } = props
    const iconClass = computed(() => `${classPrefix} ${classPrefix}-${name}`)
    const iconStyle = computed(() => ({ color, fontSize: addUnit(size) }))

    return { iconClass, iconStyle }
  },
})
</script>

<style lang="scss">
@import '~@kuiba/icons/src/index.scss';
</style>
