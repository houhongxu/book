import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const jsCodeString = "const a = 1";

const babelAst = parse(jsCodeString, { tokens: true });

traverse(babelAst, {
  enter(path) {
    console.log("enter", path.node);
  },
  exit(path) {
    console.log("exit", path.node);
  },
});
