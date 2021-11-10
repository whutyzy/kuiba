<template>
    <kuiba-demo-block title="基础展示">
        <kuiba-button @click="visible = true">popup</kuiba-button>
        <kuiba-popup v-model:visible="visible" style="padding: 30px"> 基础弹窗 </kuiba-popup>
    </kuiba-demo-block>
    <kuiba-demo-block title="弹出位置">
        <kuiba-button @click="topVisible = true">顶部弹出</kuiba-button>
        <kuiba-button @click="bottomVisible = true">底部弹出</kuiba-button>
        <kuiba-button @click="leftVisible = true">左侧弹出</kuiba-button>
        <kuiba-button @click="rightVisible = true">右侧弹出</kuiba-button>
        <kuiba-popup v-model:visible="topVisible" :style="{ height: '30%' }" position="top"></kuiba-popup>
        <kuiba-popup v-model:visible="bottomVisible" :style="{ height: '30%' }" position="bottom"></kuiba-popup>
        <kuiba-popup v-model:visible="leftVisible" :style="{ width: '30%' }" position="left"></kuiba-popup>
        <kuiba-popup
            v-model:visible="rightVisible"
            :style="{ width: '30%' }"
            position="right"
            data-position="left"
        ></kuiba-popup>
    </kuiba-demo-block>
    <kuiba-demo-block title="关闭图标">
        <kuiba-button @click="iconVisible = true">关闭图标</kuiba-button>
        <kuiba-popup v-model:visible="iconVisible" style="width: 300px; height: 100px" closeIconVisible> </kuiba-popup>
    </kuiba-demo-block>
</template>

<script>
import { ref } from 'vue'
import Button from '../../button'
import Popup from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
    name: 'PopupExample',
    components: {
        [Popup.name]: Popup,
        [Button.name]: Button,
        'kuiba-demo-block': DemoBlock
    },
    setup() {
        return {
            visible: ref(false),
            topVisible: ref(false),
            bottomVisible: ref(false),
            leftVisible: ref(false),
            rightVisible: ref(false),
            iconVisible: ref(false)
        }
    }
}
</script>
<style scoped>
.kuiba-button {
    /* display: block; */
    margin: 10px;
}
</style>
