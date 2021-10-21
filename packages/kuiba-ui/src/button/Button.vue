<template>
  <button class="kuiba-button" >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'KuibaButton',
  props: {
    color: {
      type: String
    },
    onClick: {
      type: Function as PropType<(e: Event) => void>
    }
  },
  setup(props) {
    const handleClick = (e: Event) => props.onClick?.(e)

    return {
      handleClick
    }
  }
})
</script>

<style lang="scss">
@import "./button.scss";
</style>
