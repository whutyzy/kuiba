<template>
    <kuiba-demo-block title="类型">
        <kuiba-loading type="circle" />
        <kuiba-loading type="spinner" />
    </kuiba-demo-block>
    <kuiba-demo-block title="颜色">
        <kuiba-loading color="orange" type="circle" />
        <kuiba-loading color="pink" type="spinner" />
    </kuiba-demo-block>
    <kuiba-demo-block title="大小">
        <kuiba-loading size="48px" type="circle" />
        <kuiba-loading size="48px" type="spinner" />
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
<style lang="scss">
.kuiba-demo-block {
    .kuiba-loading {
        display: inline-block;
        margin-right: 20px;
    }
}
</style>
