// esm import cjs是可行的，其中单独default导出最兼容，而具名导出只兼容一个属性，混合导出的esm语法无法兼容
// 像 import React, {useState} from 'react' 是通过构建工具实现兼容的

import defaultEsm, { addEsm } from "./utils/add-mjs.mjs";

// cjs named具名导出一个或者default导出
// import { addCjs } from "./utils/named-add-cjs.cjs";
// import defaultCjs from "./utils/default-add-cjs.cjs";

// cjs使用混合导出，只能使用default导出的方式模拟
import allExport from "./utils/default-named-add-cjs.cjs";
const defaultCjs = allExport.default;
const addCjs = allExport.addCjs;

console.log("esm import esm", addEsm(1, 2));

console.log("esm import cjs", addCjs(1, 2));

console.log("defaultEsm", defaultEsm);

console.log("defaultCjs", defaultCjs);

import * as allEsm from "./utils/add-mjs.mjs";
import * as allCjs from "./utils/default-named-add-cjs.cjs";

console.log("allEsm", allEsm);

// 需要注意
// 和import defaultCjs from "./utils/default-add-cjs.cjs"; defaultCjs对应module.export对象不同
// allCjs里的又对module.export对象包装了一层default
// 这是为了兼容cjs，默认default属性对应module.export对象
console.log("allCjs", allCjs);

// 所以esm的本质就是导出来了一个对象如{ default:'我是default', add:()=>{} }
// 但是单独约定了default的语法 import defaultEsm, { add } from "./esm.mjs";
// defaultEsm对应了对象中的default属性'我是default'，{ add }就是对象的解构

// 而cjs也是导出来了一个对象如{ default:'我是default', add:()=>{} }
// 但是cjs没有default的概念，只有全部导出这个概念 import defaultCjs from "./cjs.cjs";
// defaultCjs对应了整个对象 { default:'我是default', add:()=>{} }
// 也可以使用对象的解构 import { add } from "./cjs.cjs";
// 但是没有约定所以不能同时使用
