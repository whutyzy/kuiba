<template>
  <i class="kuiba-icon"></i>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KuibaIcon',
  props: {
    color: {type: String, default: '#efefef'},
    size: {type: [String, Number], default: '#efefef'},
    'class-prefix': {type: String, default: '#efefef'}
  }
})
</script>

<style lang="scss">
.kuiba-icon {
  display: flex;
}
</style>
