# 主题定制
### 介绍
方便的更改UI库主题配色

### 样式变量
组件库通过scss变量来组建样式，你可以在项目中直接改变Kuiba得样式变量，新建一个样式文件，写入`kuiba-variable.scss`，写入以下内容:
```scss
/* 改变主题色 */
$primary-color: red;
/* 引入kuiba-ui样式文件 */
@import '~@kuiba/ui/es/scss.scss';
```
之后在入口文件中，直接引入`kuiba-variable.scss`，不需要再引入`@kuiba/ui/es/style.js`
```js
import { createApp } from 'vue'
import App from './App.vue'
import kuibaUI from '@kuiba/ui'

import './kuiba-variable.scss'
createApp(App)
    .use(kuibaUI)
    .mount('#app')
```