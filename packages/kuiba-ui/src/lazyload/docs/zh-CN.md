# Lazyload 图片懒加载

### 介绍

当图片在可视区域内才进行加载

### 引入

通过以下方式来全局注册指令

```js
import { createApp } from 'vue'
import { Lazyload } from '@kuiba/ui'

const app = createApp()
app.use(Lazyload)

// 注册时可以配置额外的选项
app.use(Lazyload, {
    loading: 'https://xxx.cn/loading.png',
    error: 'https://xxx.cn/error.png',
    attempt: 3,
    throttleWait: 300,
    events: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove'],
    filter(lazy) {
        // 可以访问lazy上下文的所有属性,执行一些属性拦截,
        // 比如简单修改所有的图片地址http -> https
        lazy.src.replace('http://', 'https://')
    }
})
```

## 代码演示

### 基础用法

```html
<img v-lazyload="'https://xxx.jpg'" />
```

### 背景图

```html
<div v-lazyload:background-image="'https://xxx.jpg'"></div>
```

### 配置

可以内联属性通过配置的方式修改加载失败时重复的次数、错误加载图片、加载中图片

```html
<img
    v-lazyload="'https://xxx.jpg'"
    lazy-loading="https://xxx.cn/loading.png"
    lazy-error="https://xxx.cn/error.png"
    lazy-attempt="3"
/>
```

## API

### 插件选项

| 参数 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| `loading` | 加载中的图片，尽可能选择加载速度很快的图片 | _string_ | `1像素透明图片` |
| `error` | 加载失败显示的图片 | _string_ | `1像素透明图片` |
| `attempt` | 加载失败时尝试重新加载的次数 | _number_ | `3` |  
| `throttleWait` | 节流时间，数值越大事件触发频率越低 | _number_ | `300` |
| `events` | 触发可见性检测注册的事件列表 | _string[]_ | `['scroll'...]` |
| `filter` | 属性拦截函数 | _(lazy: Lazy) => void_ | `() => void` |
