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
    type: {type: String},
    size: {type: String},
    text: {type: String},
    color: {type: String},
    icon: {type: String},
    'icon-prefix': {type: String},
    'icon-position': {type: String},
    plain: {},
    round: {},
    disabled: {},
    loading: {} 

  },
  setup(props) {
    
    return {
      
    }
  }
})
</script>

<style lang="scss">
@import "./button.scss";
</style>
