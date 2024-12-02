# README

少见的需求，或许 webpack 处理代码转为 webpackRequire 属于这种

但是 webpackRequire 只是类似 cjs

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
