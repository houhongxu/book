// ! 这里用的tsx，不用加文件后缀了！
import defaultCjs from "./dist/add-cjs";

console.log("defaultCjs", defaultCjs);
console.log("defaultCjs.default", defaultCjs.default);

// 可以看到是{ default:module.exports对象 }的形式
// 相当于esm导入cjs时使用了import * as defaultCjs from ''
// 因为使用的export default requireCjs()，esm的default导出会添加default属性
