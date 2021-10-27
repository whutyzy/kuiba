<template>
  <kuiba-demo-block>
    <kuiba-loading/>
  </kuiba-demo-block>
 
</template>

<script>
import Loading from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'



export default {
  name: 'LoadingExample',
  components: {
    [Loading.name]: Loading,
    'kuiba-demo-block': DemoBlock
  },
  setup() {
     return {}
  }
}
</script>
