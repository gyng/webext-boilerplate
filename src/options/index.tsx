import * as React from "react";
import { createRoot } from "react-dom/client";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import index from "./index.html";
console.log(index); // use reference to bundle options page

import "@src/core/components/photon.css";

import { OptionsPageContainer } from "@src/core/components/OptionsPageContainer";
import { OptionsPage } from "@src/options/components/OptionsPage";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <OptionsPageContainer>
      <OptionsPage />
    </OptionsPageContainer>
  );
});
