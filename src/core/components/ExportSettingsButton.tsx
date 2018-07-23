import React from "react";

import { Button } from "@src/core/components";
import { IOptions } from "@src/core/options";
import { exportSettings } from "@src/core/options/ui";

export interface IExportSettingsState {
  options?: IOptions;
}

export class ExportSettingsButton extends React.Component<
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
