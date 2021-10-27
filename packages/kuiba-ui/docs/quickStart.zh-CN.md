# 快速开始

## 安装

### 通过 npm/yarn 安装

如果您要使用`kuiba-ui`，可以直接通过`npm`或者`yarn`进行安装

```bash
# npm
npm i @kuiba/ui -S
# yarn
yarn add @kuiba/ui -S
```

```js
import App from './App.vue'
import Kuiba from '@kuiba/ui'
import { createApp } from 'vue'
import '@kuiba/ui/es/style.js'

createApp(App).use(Kuiba).mount('#app')

```

### 通过 CDN 安装
在`html`文件中直接引入CDN链接，之后你就可以通过全局变量`kuiba`来使用`kuiba-ui`
```html
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@next"></script>
<script src="https://cdn.jsdelivr.net/npm/@kuiba/ui/umd/kuiba.js"></script>
<script>
  const app = Vue.createApp({
    template: '<kuiba-button>按钮</kuiba-button>'
  })
  app.use(Kuiba).mount('#app')
</script>
```