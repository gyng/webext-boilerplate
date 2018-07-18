// import * as options from "@src/options/core/options";
import * as React from "react";
import * as ReactDOM from "react-dom";

// import { bindImportExport } from "@src/options/core/importExport";
// require("./options.html"); // bundle options page
// require("./options-style.css"); // bundle options page

// document.addEventListener("DOMContentLoaded", options.restoreOptions);
// document.addEventListener("DOMContentLoaded", options.setupAutosave);
// document.addEventListener("DOMContentLoaded", () => {
//   const importButton = <HTMLElement>document.querySelector("#settings-import");
//   const exportButton = <HTMLElement>document.querySelector("#settings-export");
//   const exportTarget = <HTMLElement>document.querySelector("#export-target");
//   bindImportExport({ importButton, exportButton, exportTarget });
// });

require("./index.html"); // bundle options page
import OptionsPage from "@src/options/ui/OptionsPage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<OptionsPage />, document.getElementById("root"));
});
