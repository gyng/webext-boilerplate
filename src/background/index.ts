import { init } from "@src/core";
import { Actions } from "@src/core/messaging";

init();

console.log("Hello from the background script!");

Actions.optionsGet().then(console.log);
