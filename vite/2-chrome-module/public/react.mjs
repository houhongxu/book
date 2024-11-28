import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  React.createElement("div", null, "im react"),
  document.getElementById("root")
);

// typemodule 也可以通过cdn引入esm库并执行
// 但是想使用包名，需要通过浏览器的importmap
