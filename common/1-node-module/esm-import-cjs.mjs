console.log("<==================== esm-import-cjs.mjs ====================>");

// esm import cjs是可行的，其中单独default导出最兼容，而具名导出只兼容一个属性，混合导出的esm语法无法兼容
// 像 import React, {useState} from 'react' 是通过工具如ts实现兼容的

import defaultEsm, { addEsm } from "./add-esm.mjs";

// cjs named具名导出一个或者default导出
import { addCjs } from "./add-cjs.cjs";
import defaultCjs from "./add-cjs.cjs";

console.log("esm import esm", addEsm(1, 2));

console.log("esm import cjs", addCjs(1, 2));

console.log("defaultEsm", defaultEsm);

console.log("defaultCjs", defaultCjs);

import * as allEsm from "./add-esm.mjs";
import * as allCjs from "./add-cjs.cjs";

console.log("allEsm", allEsm);

// 需要注意
// 和import defaultCjs from "./dd-cjs.cjs"; defaultCjs对应module.export对象不同
// allCjs里的又对module.exports对象包装了一层default
// 这是为了兼容esm，默认default属性对应module.exports对象
console.log("allCjs", allCjs);

// 所以esm的本质就是导出来了一个对象如{ default:'我esm有default', add:()=>{} }
// 但是单独约定了default的语法 import defaultEsm, { add } from "./esm.mjs";
// defaultEsm对应了对象中的default属性'我是default'，{ add }就是对象的解构

// 而cjs也是导出来了一个对象如{ default:'我cjs没有default', add:()=>{} }
// 但是cjs没有default的概念，只有全部导出这个概念，esm就使用default导入cjs的全部导出 import defaultCjs from "./cjs.cjs";
// defaultCjs对应了整个对象 { default:'我cjs没有default', add:()=>{} }
// 你可以再对对象进行结构const {}=defaultCjs
