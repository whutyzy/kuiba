<template>
    <kuiba-demo-block title="懒加载演示">
        <div v-for="(img, index) in imageList" :key="index" class="image-card">
            <img v-lazyload="img" />
        </div>
    </kuiba-demo-block>
    <kuiba-demo-block title="背景图演示">
        <div v-for="(img, index) in imageList" :key="index" v-lazyload:background-image="img" class="image-card"></div>
    </kuiba-demo-block>
</template>

<script>
import Lazyload from '../index'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default {
    name: 'LazyloadExample',
    components: {
        'kuiba-demo-block': DemoBlock
    },
    directives: {
        Lazyload
    },
    setup() {
        return {
            imageList: [
                'https://images.pexels.com/photos/4681107/pexels-photo-4681107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'https://images.pexels.com/photos/235805/pexels-photo-235805.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'https://images.pexels.com/photos/245035/pexels-photo-245035.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.image-card {
    width: 300px;
    height: 300px;
    background-color: #efefef;
    margin-bottom: 10px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
