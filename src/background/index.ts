import { init } from "@src/core";
import { Actions } from "@src/core/messaging";

init();

// tslint:disable-next-line:no-console
console.log("Hello from the background script!");

// tslint:disable-next-line:no-console
Actions.optionsGet().then(console.log);
