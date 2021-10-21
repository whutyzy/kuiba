<template>
    <kuiba-demo-block title="按钮类型">
        <kuiba-button></kuiba-button>
    </kuiba-demo-block>
</template>

<script>
import Button from '../Button'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
  components: {
    [DemoBlock.name]: DemoBlock,
    [Button.name]: Button,
  },
}
</script>
