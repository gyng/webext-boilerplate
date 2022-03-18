import React from "react";

import {
  Button,
  Checkbox,
  Select,
  Textarea,
  Textbox,
} from "@src/core/components/controls";

import { BROWSERS } from "@src/core/browser-detector";
import { BrowserOnly } from "@src/core/components/BrowserOnly";
import { TL } from "@src/tl";

// This will be injected into OptionsPageContainer
// Options are availabe to controls via a React context set up in OptionsPageContainer
export const OptionsPage: React.FC = () => (
  <>
    <h2>Hello, {TL.extensionName}!</h2>

    <Checkbox name="foo" labelEl={TL.oFoo} />
    <Textarea name="bar" labelEl={<h3>{TL.oBar}</h3>} />

    <Select
      name="baz"
      labelEl="Pick me!"
      options={[{ label: "pick a", value: "a" }, { value: "b" }]}
    />

    <Textbox name="qix" labelEl="Lazy foxes" />

    <Textbox name="qaz" labelEl="Coming soon!" disabled />

    <BrowserOnly browser={BROWSERS.FIREFOX}>
      <Textbox name="ff" labelEl="Firefox only" />
    </BrowserOnly>

    <BrowserOnly browser={BROWSERS.CHROME}>
      <Textbox name="ch" labelEl="Chrome only" />
    </BrowserOnly>

    <div className="infobar row">An information bar</div>

    <Button
      onClick={() => {
        console.log("yay");
      }}
    >
      A useless button
    </Button>
  </>
);
