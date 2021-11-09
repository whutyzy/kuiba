<template>
  <kuiba-demo-block>
    <kuiba-popup/>
  </kuiba-demo-block>
 
</template>

<script>
import Popup from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: 'PopupExample',
  components: {
    [Popup.name]: Popup,
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
