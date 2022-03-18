import * as React from "react";
import * as ReactDOM from "react-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import index from "./index.html";
console.log(index); // use reference to bundle options page

import { OptionsPageContainer } from "@src/core/components/OptionsPageContainer";
import { OptionsPage } from "@src/options/components/OptionsPage";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <OptionsPageContainer>
      <OptionsPage />
    </OptionsPageContainer>,
    document.getElementById("root")
  );
});
