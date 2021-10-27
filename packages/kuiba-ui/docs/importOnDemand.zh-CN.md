# 按需引入
### 介绍
避免组件库全量导入。减少发布包的大小

### 手动引入
在不使用插件的情况下，可以手动引入需要使用的组件和样式
``` js
import { Button } from '@kuiba/ui'
import '@kuiba/ui/es/button/style/index.js'
```

### 通过babel插件按需引入组件
安装插件
```bash
#npm
npm i babel-plugin-import -D
#yarn
yarn add babel-plugin-import -D
```
在.babelrc中添加配置
```js
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "@kuiba/ui",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}
```
接着可以在代码中直接引入Kuiba组件，插件会自动对代码进行转换
```js
import { Button } from '@kuiba/ui';

// 编译后代码
import Button from '@kuiba/ui/es/button';
import '@kuiba/ui/es/button/style';
```