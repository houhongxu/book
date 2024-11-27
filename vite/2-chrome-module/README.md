# README

esm.sh、skypack、jspm 是 基于 ESM 的 CDN 基础设施

其中的包将 cjs 的包处理为了 esm 导出

例如 [esm.sh react](https://esm.sh/react)

```js
/* esm.sh - react@18.3.1 */
export * from "/stable/react@18.3.1/es2022/react.mjs";
export { default } from "/stable/react@18.3.1/es2022/react.mjs";
```
注意不要直接使用cdn url到项目
