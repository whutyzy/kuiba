# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 引入

通过以下方式来全局注册组件

```js
import { createApp } from 'vue';
import { Popup } from '@kuiba/ui';

const app = createApp();
app.use(Popup);
```

## 代码演示

### 基础用法

通过 `v-model:visible` 控制弹出层是否展示。

```html
<kuiba-button @click="showPopup">popup</kuiba-button>
<kuiba-popup v-model:visible="visible" style="padding: 30px"> 基础弹窗 </kuiba-popup>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    const visible = ref(false);
    const showPopup = () => {
      visible.value = true;
    };
    return {
      visible,
      showPopup,
    };
  },
};
```

### 弹出位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

```html
<kuiba-popup v-model:visible="visible" position="top" :style="{ height: '30%' }" />
```

### 指定挂载位置

弹出层默认挂载到组件标签所在位置，可以通过 `teleport` 属性指定挂载位置。

```html
<!-- 挂载到 body 节点下 -->
<kuiba-popup v-model:visible="visible" teleport="body" />

<!-- 挂载到 #app 节点下 -->
<kuiba-popup v-model:visible="visible" teleport="#app" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model:visible | 是否显示弹出层 | _boolean_ | `false` |
| overlayVisible | 是否显示遮罩层 | _boolean_ | `true` |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_ | `center` |
| overlay-class | 自定义遮罩层类名 | _string \| Array \| object_ | - |
| overlay-style | 自定义遮罩层样式 | _object_ | - |
| lock-scroll | 是否锁定背景滚动 | _boolean_ | `true` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
| closeable | 是否显示关闭图标 | _boolean_ | `false` |
| before-close `v3.1.4` | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 Promise | _(action: string) => boolean \| Promise\<boolean\>_ | - |
| teleport | 指定挂载的节点，等同于 Teleport 组件的 [to 属性](https://v3.cn.vuejs.org/api/built-in-components.html#teleport) | _string \| Element_ | - |


### Events

| 事件名           | 说明                       | 回调参数            |
| ---------------- | -------------------------- | ------------------- |
| click            | 点击弹出层时触发           | _event: MouseEvent_ |
| click-overlay    | 点击遮罩层时触发           | _event: MouseEvent_ |
| click-close-icon | 点击关闭图标时触发         | _event: MouseEvent_ |
| open             | 打开弹出层时触发           | -                   |
| close            | 关闭弹出层时触发           | -                   |
| opened           | 打开弹出层且动画结束后触发 | -                   |
| closed           | 关闭弹出层且动画结束后触发 | -                   |

### Slots

| 名称                      | 说明         |
| ------------------------- | ------------ |
| default                   | 弹窗内容     |

