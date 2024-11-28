# README

## rollup

esm2cjs 是 vite 里最常用的转换了

因为 vite 基于 esm

vite 的构建基于 rollup

所以就是 rollup 的模块处理方式

## tsx

tsx 是基于 esbuild 的 ts 文件执行器

The easiest way to run TypeScript in Node.js 名副其实

## cjs > esm

```js
// 获取对象所有属性包括不可枚举
var __getOwnPropNames = Object.getOwnPropertyNames;

// 模拟的cjs加载函数，cb是相当于node的iife模块定义函数
// mod是module的缓存，相当于var mod = undefined
// __getOwnPropNames(cb)[0]是cb的第一个key
// 严格模式下(0, func)能保证func当做函数调用，逗号表达式先计算左边然后执行并返回右边
// ,mod.exports 最后一个逗号表达式返回 mod.exports
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };

// 调用模拟cjs，对象的key为文件名，对象的value为node的iife函数
var require_add_cjs = __commonJS({
  "add-cjs.js"(exports, module) {
    module.exports = {
      addCjs(a, b) {
        return a + b;
      },
    };
  },
});

export default require_add_cjs();
```
