# 图片
### 介绍
增强的`img`标签，支持图片懒加载、加载失败提示、加载错误提示

### 引入
通过以下方式来全局注册组件
``` js
import { createApp } from 'vue';
import { Image  } from 'kuiba';

const app = createApp();
app.use(Image);
```

## 代码演示

### 基础用法

基础用法与原生 `img` 标签一致，可以设置 `src`、`width`、`height`等原生属性。

```html
<kuiba-image width="100" height="100" src="https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg" />
```

### 填充模式

通过 `fit` 属性可以设置图片填充模式，可选值见下方表格。

```html
<kuiba-imagge
  width="100px"
  height="100px"
  fit="contain"
  src="https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg"
/>
```

### 图片懒加载

设置 `lazy-load` 属性来开启图片懒加载，需要搭配 [Lazyload](#/zh-CN/lazyload) 组件使用。

```html
<kuiba-imagge
  width="100"
  height="100"
  lazy-load
  src="https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg"
/>
```

```js
import { createApp } from 'vue';
import { Lazyload } from 'kuiba';

const app = createApp();
app.use(Lazyload);
```

### 加载中提示

`Image` 组件提供了默认的加载中提示，支持通过 `loading` 插槽自定义内容。

```html
<kuiba-imagge src="https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg">
  <template v-slot:loading>
    <van-loading type="spinner" size="20" />
  </template>
</kuiba-imagge>
```

### 加载失败提示

`Image` 组件提供了默认的加载失败提示，支持通过 `error` 插槽自定义内容。

```html
<kuiba-imagge src="https://i.loli.net/2021/11/01/jTC5EJK6UrZMkul.jpg">
  <template v-slot:error>加载失败</template>
</kuiba-imagge>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片链接 | _string_ | - |
| fit | 图片填充模式 | _string_ | `fill` |
| width | 宽度，默认单位为 `px` | _number \| string_ | - |
| height | 高度，默认单位为 `px` | _number \| string_ | - |
| lazy-load | 是否开启图片懒加载，须配合 [Lazyload](#/zh-CN/lazyload) 组件使用 | _boolean_ | `false` |
| show-error | 是否展示图片加载失败提示 | _boolean_ | `true` |
| show-loading | 是否展示图片加载中提示 | _boolean_ | `true` |


### 图片填充模式

| 名称       | 含义                                                   |
| ---------- | ------------------------------------------------------ |
| contain    | 保持宽高缩放图片，使图片的长边能完全显示出来           |
| cover      | 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边 |
| fill       | 拉伸图片，使图片填满元素                               |
| none       | 保持图片原有尺寸                                       |
| scale-down | 取 `none` 或 `contain` 中较小的一个                    |

### Events

| 事件名 | 说明               | 回调参数            |
| ------ | ------------------ | ------------------- |
| click  | 点击图片时触发     | _event: MouseEvent_ |
| load   | 图片加载完毕时触发 | -                   |
| error  | 图片加载失败时触发 | -                   |

### Slots

| 名称    | 说明                       |
| ------- | -------------------------- |
| loading | 自定义加载中的提示内容     |
| error   | 自定义加载失败时的提示内容 |



