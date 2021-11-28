<template>
    <kuiba-demo-block title="基础演示">
        <kuiba-button @click="showToast('text')">文字提示</kuiba-button>
        <kuiba-button @click="showToast('loading')">加载提示</kuiba-button>
        <kuiba-button @click="showToast('success')">成功提示</kuiba-button>
        <kuiba-button @click="showToast('fail')">失败提示</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="位置演示">
        <kuiba-button @click="showPositionToast('top')">top</kuiba-button>
        <kuiba-button @click="showPositionToast('bottom')">bottom</kuiba-button>
    </kuiba-demo-block>
    <kuiba-demo-block title="动态更新演示">
        <kuiba-button @click="timeoutToast">动态toast</kuiba-button>
    </kuiba-demo-block>
</template>

<script>
import Toast from '../function-call'
import Button from '../../button'
import DemoBlock from '../../../example-components/DemoBlock.vue'
import { ref } from 'vue'

export default {
    name: 'ToastExample',
    components: {
        [Toast.name]: Toast,
        [Button.name]: Button,
        'kuiba-demo-block': DemoBlock
    },
    setup() {
        const showToast = (type = 'text') => {
            Toast({ message: 'toast 演示', type })
        }
        const showPositionToast = (position) => {
            Toast({ message: 'position 演示', position })
        }
        const timeoutToast = () => {
            let second = 3
            const toast = Toast(`${second}s后关闭`)
            let timer = setInterval(() => {
                if (second <= 1) {
                    clearInterval(timer)
                    toast.clear()
                }
                second--
                toast.message = `${second}s后关闭`
            }, 1000)
        }
        return { showToast, showPositionToast, timeoutToast, visible: ref(true) }
    }
}
</script>
<style scoped>
.kuiba-button {
    margin: 10px;
}
</style>
