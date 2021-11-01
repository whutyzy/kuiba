<template>
    <kuiba-demo-block title="基础">
        <kuiba-image :src="imageSrc" width="100px" height="100px" />
    </kuiba-demo-block>
    <kuiba-demo-block title="填充模式">
        <div class="image-card">
            <kuiba-image :src="imageSrc" fit="cover" width="100px" height="100px" />
            <p>cover</p>
        </div>
        <div class="image-card">
            <kuiba-image :src="imageSrc" fit="contain" width="100px" height="100px" />
            <p>contain</p>
        </div>

        <div class="image-card">
            <kuiba-image :src="imageSrc" fit="scale-down" width="100px" height="100px" />
            <p>scale-down</p>
        </div>
        <div class="image-card">
            <kuiba-image :src="imageSrc" fit="none" width="100px" height="100px" />
            <p>none</p>
        </div>
    </kuiba-demo-block>
    <!-- <kuiba-demo-block title="加载中提示">
        <div class="image-card">
            <kuiba-image :src="imageSrc" fit="cover" width="100px" height="100px"></kuiba-image>
        </div>
    </kuiba-demo-block> -->
    <kuiba-demo-block title="加载失败提示">
        <div class="image-card">
            <kuiba-image fit="contain" width="100px" height="100px"></kuiba-image>
        </div>
    </kuiba-demo-block>
</template>

<script>
import Image from '..'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
    name: 'ImageExample',
    components: {
        [Image.name]: Image,
        'kuiba-demo-block': DemoBlock
    },
    setup() {
        return {
            imageSrc: 'https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg'
        }
    }
}
</script>
<style lang="scss" scoped>
.image-card {
    display: inline-block;
    padding: 5px;
    p {
        margin-top: 5px;
        text-align: center;
        color: #646566;
        font-size: 14px;
    }
}
</style>
