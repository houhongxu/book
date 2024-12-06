# README

少见的需求，哪怕 webpack 处理代码转为 webpackRequire 也不完全属于这种

vite 可能不太考虑这种场景，所以只有 srr 打开时可以转化

而这时又不是基于 esbuild 而是基于 rollup 转换

通过 rollup-commonjs 插件兼容比较好

## esm > cjs

```js
"use strict";
// 添加esm转换标记
Object.defineProperties(exports, {
  __esModule: { value: true },
  [Symbol.toStringTag]: { value: "Module" },
});

function addEsm(a, b) {
  return a + b;
}

const addEsm$1 = {
  text: "我是esm default",
};

exports.addEsm = addEsm;
exports.default = addEsm$1;
```
