<template>
  <kuiba-demo-block title="Icon 图标"> </kuiba-demo-block>
  <kuiba-icon />
</template>

<script>
import Icon from '../Icon.vue'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
  name: 'IconExample',
  components: {
    [Icon.name]: Icon,
    [DemoBlock.name]: DemoBlock
  },
  setup() {
    return {
      
    }
  },
}
</script>
