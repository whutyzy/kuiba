<template>
  <kuiba-demo-block>
    <kuiba-dialog/>
  </kuiba-demo-block>
 
</template>

<script>
import Dialog from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: 'DialogExample',
  components: {
    [Dialog.name]: Dialog,
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
