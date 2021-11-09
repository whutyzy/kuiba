<template>
  <kuiba-demo-block>
    <kuiba-toast/>
  </kuiba-demo-block>
 
</template>

<script>
import Toast from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: 'ToastExample',
  components: {
    [Toast.name]: Toast,
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
