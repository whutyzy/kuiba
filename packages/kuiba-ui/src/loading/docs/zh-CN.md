# 加载图标

### 介绍

加载图标，适用于各种过度状态

### 引入

通过以下方式来全局注册组件

```js
import { createApp } from 'vue'
import { Loading } from '@kuiba/ui'

const app = createApp()
app.use(Loading)
```

## 代码演示

### 类型
类型有两种可选值：`circle`、 `spinner`
```html
<kuiba-loading type="circle" />
<kuiba-loading type="spinner" />
```

### 颜色
默认使用当前颜色，也可以通过`color`属性进行更改
```html
<kuiba-loading color="orange" type="circle" />
<kuiba-loading color="pink" type="spinner" />
```

### 大小
可以传入任意合法的`size`,来更改大小
```html
<kuiba-loading size="48px" type="circle" /> 
<kuiba-loading size="48px" type="spinner" />
```

## API

### Props

| 参数       | 说明                          | 类型               | 默认值     |
| ---------- | ----------------------------- | ------------------ | ---------- |
| color      | 颜色                          | _string_           | `currentColor`  |
| type       | 类型，可选值为 `spinner`      | _string_           | `circle` |
| size       | 加载图标大小，默认单位为 `px` | _number \| string_ | `30px`     |

