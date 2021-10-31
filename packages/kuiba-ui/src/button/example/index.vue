<template>
    <kuiba-demo-block title="按钮类型">
        <kuiba-button>默认按钮</kuiba-button>
        <kuiba-button type="primary">主要按钮</kuiba-button>
        <kuiba-button type="success">成功按钮</kuiba-button>
        <kuiba-button type="warning">警告按钮</kuiba-button>
        <kuiba-button type="danger">危险按钮</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="朴素按钮">
        <kuiba-button>默认按钮</kuiba-button>
        <kuiba-button type="primary" plain>主要按钮</kuiba-button>
        <kuiba-button type="success" plain>成功按钮</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="禁用状态">
        <kuiba-button disabled>默认按钮</kuiba-button>
        <kuiba-button type="primary" disabled>主要按钮</kuiba-button>
        <kuiba-button type="success" disabled>成功按钮</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="图标按钮">
        <kuiba-button icon="plus" type="primary">左侧</kuiba-button>
        <kuiba-button icon="plus" icon-position="right">右侧</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="图标大小">
        <kuiba-button size="normal">普通</kuiba-button>
        <kuiba-button size="small">小型</kuiba-button>
        <kuiba-button size="mini">迷你</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="加载状态">
        <kuiba-button loading type="primary"></kuiba-button>
        <kuiba-button loading loading-type="spinner" type="primary"></kuiba-button>
        <kuiba-button loading type="success">加载中</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="块级元素">
        <kuiba-button block type="primary">块级元素</kuiba-button>
    </kuiba-demo-block>
</template>

<script>
import Button from '../Button'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
    components: {
        [DemoBlock.name]: DemoBlock,
        [Button.name]: Button
    }
}
</script>
<style lang="scss" scoped>
.kuiba-button {
    margin: 0 10px 10px 0;
}
</style>
