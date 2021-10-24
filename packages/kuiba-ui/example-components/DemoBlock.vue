<template>
  <div class="kuiba-demo-block">
    <h4 class="kuiba-demo-block__title">{{ title }}</h4>
    <div class="kuiba-demo-block__container"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'KuibaDemoBlock',
  props: { title: { type: String } },
  setup() {},
})
</script>
<style lang="scss" scoped>
.kuiba-demo-block {
  &__title {
    margin: 0;
    padding: 32px 16px 16px 0;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
