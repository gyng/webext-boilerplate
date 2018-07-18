import * as React from "react";
import * as ReactDOM from "react-dom";

require("./index.html"); // bundle options page
import OptionsPage from "@src/options/components/OptionsPage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<OptionsPage />, document.getElementById("root"));
});
