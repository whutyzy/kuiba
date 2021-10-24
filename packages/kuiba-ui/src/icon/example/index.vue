<template>
  <kuiba-demo-block title="基础用法">
    <div class="icon-row">
      <div v-for="name in exampleIconList" :key="name" class="icon-example-box">
        <kuiba-icon :name="name" />
      </div>
    </div>
  </kuiba-demo-block>
  <kuiba-demo-block title="图标颜色">
    <div class="icon-row">
      <div class="icon-example-box">
        <kuiba-icon name="arrow-left" />
      </div>
      <div class="icon-example-box">
        <kuiba-icon name="arrow-left" color="orange" />
      </div>
    </div>
  </kuiba-demo-block>
  <kuiba-demo-block title="图标大小">
    <div class="icon-row">
      <div class="icon-example-box">
        <kuiba-icon name="arrow-left" size="16px" />
      </div>
      <div class="icon-example-box">
        <kuiba-icon name="arrow-left" size="32px" />
      </div>
    </div>
  </kuiba-demo-block>
  <kuiba-demo-block title="图标列表">
    <div class="icon-row">
      <div v-for="name in iconList" :key="name" class="icon-example-box">
        <kuiba-icon :name="name" />
        <span>{{ name }}</span>
      </div>
    </div>
  </kuiba-demo-block>
</template>

<script lang="ts">
import Icons from '@kuiba/icons'
import { defineComponent, reactive } from 'vue'
import Icon from '../Icon.vue'
import DemoBlock from '../../../example-components/DemoBlock.vue'

export default defineComponent({
  name: 'IconExample',
  components: {
    [Icon.name]: Icon,
    [DemoBlock.name]: DemoBlock,
  },
  setup() {
    const iconList = reactive(Icons.basic)
    const exampleIconList = ['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down']
    return {
      exampleIconList,
      iconList,
    }
  },
})
</script>
<style lang="scss">
.icon-row {
  .icon-example-box {
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    width: 25%;
    margin-bottom: 10px;
    .kuiba-icon {
      font-size: 24px;
    }
    span {
      display: block;
      text-align: center;
      color: #999;
      line-height: 28px;
      font-size: 14px;
    }
  }
}
</style>
