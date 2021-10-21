<template>
  <button class="kuiba-button" >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'


export default defineComponent({
  name: 'KuibaButton',
  props: {},
  setup(props) {
    return {
      
    }
  }
})
</script>

<style lang="scss">
@import "./button.scss";
</style>
