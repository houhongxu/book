// ! 这里用的tsx，不用加文件后缀了！
import defaultEsm from "./dist/add-esm";

console.log("defaultEsm", defaultEsm);
console.log("defaultEsm.default", defaultEsm.default);

// 可以看到是{ default:module.exports对象 }的形式
// 相当于esm导入cjs时使用了import * as defaultEsm from ''
// 因为使用的export default requireCjs()，esm的default导出会添加default属性
