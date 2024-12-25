import { viteBuild } from "./build";
import { viteDev } from "./server";

const args = process.argv.slice(2);

if (args.includes("--dev")) {
  viteDev();
} else if (args.includes("--build")) {
  viteBuild();
}
