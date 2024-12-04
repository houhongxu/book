# README

esm2cjs 是 vite 里最常用的转换了

理论上 vite 打包基于 rollup

那么是不是和 rollup 的 esm2cjs 一样呢

其实不是，transform 阶段 vite 是交给了 esbuild

可以看产物，rollup 的格式和 vite 并不相同

## tsx

tsx 是基于 esbuild 的 ts 文件执行器

The easiest way to run TypeScript in Node.js 名副其实

## cjs > esm

```js
// 获取对象所有属性包括不可枚举
var __getOwnPropNames = Object.getOwnPropertyNames;

// 模拟的cjs加载函数，cb是相当于node的iife模块定义函数
// mod是module的缓存，没传入相当于没有缓存

// 逗号表达式先计算左边然后执行并返回右边，严格模式下(0, func)能保证func当做函数调用，

// 所以执行顺序就是 0 > cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }) > 返回mod.exports
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
      addDefault: { text: "我cjs没有default" },
    };
  },
});

export default require_add_cjs();
```
