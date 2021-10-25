# 按钮

### 引入

```js
import { createApp } from 'vue'
import { Button } from '@kuiba/ui'

createApp().use(Button)
```

## 代码演示
### 按钮类型
按钮支持 `defaul`t、`primary`、`success`、`warning`、`danger` 五种类型，默认为 default
```html
<kuiba-button>默认按钮</kuiba-button>
    <kuiba-button type="primary">主要按钮</kuiba-button>
    <kuiba-button type="success">成功按钮</kuiba-button>
    <kuiba-button type="warning">警告按钮</kuiba-button>
    <kuiba-button type="danger">危险按钮</kuiba-button>
```


### 朴素按钮
通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。
```html
<kuiba-button plain type="primary">朴素按钮</kuiba-button>
<kuiba-button plain>朴素按钮</kuiba-button>
```

### 禁用状态
通过`disabled`属性将按钮设置为禁用状态
```html
<kuiba-button disabled type="primary">禁用按钮</kuiba-button>
```

### 图标按钮
`icon`属性可以给按钮添加图标，默认在左边，可以通过`icon-position`属性设置icon位置
```html
<kuiba-button icon="plus" type="primary">左侧</kuiba-button>
<kuiba-button icon="plus" icon-position="right">右侧</kuiba-button>
```

### 按钮大小
通过`size`属性设置按钮大小，可选值有`normal`,`small`,`mini`
```html
<kuiba-button size="normal">普通</kuiba-button>
<kuiba-button size="small">小型</kuiba-button>
<kuiba-button size="mini">迷你</kuiba-button>
```
## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `success` `warning` `danger` | _string_ | `default` |
| size | 尺寸，可选值为  `small` `mini` | _string_ | `normal` |
| icon | 左侧[图标名称](#/zh-CN/icon) | _string_ | - |
| icon-prefix | 图标类名前缀，等同于 Icon 组件的 [class-prefix 属性](#/zh-CN/icon#props) | _string_ | `kuiba-icon` |
| icon-position | 图标展示位置，可选值为 `right` | _string_ | `left` |
| native-type | 原生 button 标签的 type 属性 | _string_ | `button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| plain | 是否为朴素按钮 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |


### Events

| 事件名     | 说明                                     | 回调参数            |
| ---------- | ---------------------------------------- | ------------------- |
| click      | 点击按钮，且按钮状态不为加载或禁用时触发 | _event: MouseEvent_ |

### Slots

| 名称           | 说明           |
| -------------- | -------------- |
| default        | 按钮内容       |

