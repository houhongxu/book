import { webpack } from "webpack";
import { webpackConfig } from "./webpack.config";

function run() {
  const compiler = webpack(webpackConfig);

  compiler.run((stats) => {
    console.log(stats);
  });
}

run();
