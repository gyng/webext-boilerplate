import React from "react";
import { exportSettings } from "@src/core/options/ui";
import Button from "@src/core/components/Button";
import { schema } from "@src/schema";

export interface IExportSettingsState {
  options?: typeof schema;
}

export default class ExportSettingsButton extends React.Component<
  {},
  IExportSettingsState
> {
  public constructor(props: IExportSettingsState) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <Button
          onClick={() => {
            exportSettings.then(options => this.setState({ options }));
          }}
          style={{ marginLeft: "8px" }}
        >
          __MSG_oExportSettings__
        </Button>

        <textarea
          style={{ display: this.state.options ? "block" : "none" }}
          spellCheck={false}
          value={JSON.stringify(this.state.options, null, 2)}
        />
      </div>
    );
  }
}
