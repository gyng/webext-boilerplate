import * as React from "react";
import * as ReactDOM from "react-dom";

require("./index.html"); // bundle options page

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
