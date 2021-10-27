# 浏览器适配

### 介绍

组件库提供移动端适配方案,
移动端使用`postcss-px-to-viewport`方案进行适配

## 移动端适配

### Viewport 布局

`KuibaUi` 默认使用`px`作为样式单位，如果需要使用`viewport`单位 (vw, vh, vmin, vmax)，推荐使用`postcss-px-to-viewport`进行转换。

`postcss-px-to-viewport`是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。

```shell
# npm
npm i postcss-px-to-viewport -D
# yarn
yarn add postcss-px-to-viewport -D
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
      unitPrecision: 6,
      unitToConvert: 'px',
      propList: ['*'],
    },
  },
}
```

> Tips: 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 Vant 样式无法被编译。

### Rem 布局适配

如果需要使用 `rem` 单位进行适配，推荐使用以下两个工具：
- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位
- [lib-flexible](https://github.com/amfe/lib-flexible) 用于设置 rem 基准值

[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem) 是一款 PostCSS 插件，用于将 px 单位转化为 rem 单位


#### PostCSS 示例配置

下面提供了一份基本的 PostCSS 示例配置，可以在此配置的基础上根据项目需求进行修改。

```js
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

#### 其他设计稿尺寸

如果设计稿的尺寸不是 375，而是 750 或其他大小，可以将 `rootValue` 配置调整为:

```js
// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue({ file }) {
        return file.indexOf('@kuiba/ui') !== -1 ? 37.5 : 75;
      },
      propList: ['*'],
    },
  },
};
```
