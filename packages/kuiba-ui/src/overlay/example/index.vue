<template>
    <kuiba-demo-block title="基础用法">
        <kuiba-button type="primary" @click="overlay1Visible = true">显示遮罩层</kuiba-button>
        <kuiba-overlay :visible="overlay1Visible" @click="overlay1Visible = false" />
    </kuiba-demo-block>
    <kuiba-demo-block title="嵌入内容">
        <kuiba-button type="primary" @click="overlay2Visible = true">嵌入内容</kuiba-button>
        <kuiba-overlay @click="overlay2Visible = false" :visible="overlay2Visible"
            ><div class="center"></div>
        </kuiba-overlay>
    </kuiba-demo-block>
</template>

<script>
import { ref } from 'vue'
import Button from '../../button'
import Overlay from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
    name: 'OverlayExample',
    components: {
        [Overlay.name]: Overlay,
        [Button.name]: Button,
        'kuiba-demo-block': DemoBlock
    },
    setup() {
        const overlay1Visible = ref(false)
        const overlay2Visible = ref(false)
        return { overlay1Visible, overlay2Visible }
    }
}
</script>
<style>
.center {
    width: 200px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
