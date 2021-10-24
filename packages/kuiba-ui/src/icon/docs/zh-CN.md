# Icon

### 介绍

基于 IconFont 的字体图标库，可以自行引入其他图标

### 引入

```js
import Vue from 'vue'
import { Icon } from 'kuiba'

Vue.use(Icon)
```

### 基础用法

Icon 的 `name` 属性传入图标名称即可

```html
<kuiba-icon name="arrow-left" /> 
<kuiba-icon name="arrow-right" />
```

### 图标颜色

Icon 的`color`用来设置图标颜色

```html
<kuiba-icon name="arrow-left" color="orange"/> 
<kuiba-icon name="arrow-right" color="pink" />
```

### 图标大小

Icon 的`size`用来设置图标大小，可以为数字或者字符串如`16px`

```html
<kuiba-icon name="arrow-left" :size="12"/> 
<kuiba-icon name="arrow-right" size="24px" />
```

### 自定义图标

如果想使用其他的`iconfont`图标，可以在本地引入对应的图标文件后，通过配置`prefix-class`属性来直接使用
```css
@font-face {
  font-family: 'iconfont';
  src: url('./iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: 'iconfont';
}

.iconfont-warning::before {
  content: '\e626';
}
```
```html
<kuiba-icon prefix-class="iconfont" name="warning">
```