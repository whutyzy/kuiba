<template>
  <kuiba-demo-block>
    <kuiba-notify/>
  </kuiba-demo-block>
 
</template>

<script>
import Notify from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: 'NotifyExample',
  components: {
    [Notify.name]: Notify,
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
