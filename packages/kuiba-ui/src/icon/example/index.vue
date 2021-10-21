<template>
 
  <kuiba-icon/>
</template>

<script>
import Icon from '../Icon.vue'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
  name: 'IconExample',
  components: {
    [Icon.name]: Icon,
    AppType
  },
  setup() {
     return {
       pack
     }
  }
}
</script>
