import React from "react";

import {
  Button,
  Checkbox,
  Select,
  Textarea,
  Textbox
} from "@src/core/components/controls";

import { BROWSERS } from "@src/core/browser-detector";
import { BrowserOnly } from "@src/core/components/BrowserOnly";

const styles = require("@src/core/components/photon.scss");

// This will be injected into OptionsPageContainer
// Options are availabe to controls via a React context set up in OptionsPageContainer
export const OptionsPage: React.SFC<{}> = () => (
  <>
    <h2>Hello, __MSG_extensionName__!</h2>

    <Checkbox name="foo" label="__MSG_oFoo__" />

    <Textarea name="bar" label={<h3>__MSG_oBar__</h3>} />

    <Select
      name="baz"
      label="Pick me!"
      options={[{ label: "pick a", value: "a" }, { value: "b" }]}
    />

    <Textbox name="qix" label="Lazy foxes" />

    <Textbox name="qaz" label="Coming soon!" disabled={true} />

    <BrowserOnly browser={BROWSERS.FIREFOX}>
      <Textbox name="ff" label="Firefox only" disabled={true} />
    </BrowserOnly>

    <BrowserOnly browser={BROWSERS.CHROME}>
      <Textbox name="ch" label="Chrome only" disabled={true} />
    </BrowserOnly>

    <div className={`${styles.infoBar} ${styles.row}`}>An information bar</div>

    <Button
      onClick={() => {
        // tslint:disable-next-line:no-console
        console.log("yay");
      }}
    >
      A useless button
    </Button>
  </>
);
