import React from "react";

import { Button, ExportSettingsButton } from "@src/core/components/controls";
import { CoreMessageType, ICoreMessage, Listener } from "@src/core/messaging";
import { importSettings, resetSettings } from "@src/core/options/ui";

const styles = require("./photon.scss");

export interface ISettingsSectionState {
  lastUpdated?: Date;
}

export class SettingsSection extends React.Component<
  {},
  ISettingsSectionState
> {
  private listener: Listener;

  public constructor(props: {}) {
    super(props);

    this.listener = requestObj => {
      const request = requestObj as ICoreMessage;

      switch (request.type) {
        case CoreMessageType.OPTIONS_UPDATED:
          this.setState({ lastUpdated: new Date() });
          break;
        default:
          break;
      }
    };

    this.state = {};
  }

  public render() {
    return (
      <>
        <h2 id="section-more-options">
          __MSG_oMoreOptions__
          <div className={styles.floatRight}>
            <Button onClick={resetSettings}>__MSG_oRestoreDefaults__</Button>
          </div>
        </h2>

        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          <Button onClick={importSettings}>__MSG_oImportSettings__</Button>
          <ExportSettingsButton />
        </div>

        <p>
          <span>__MSG_oLastSavedAt__</span>
          <span id="lastSavedAt">
            {this.state.lastUpdated
              ? this.state.lastUpdated.toLocaleString()
              : "__MSG_oLastSavedAtNever__"}
          </span>
        </p>
      </>
    );
  }

  public componentDidMount() {
    browser.runtime.onMessage.addListener(this.listener);
  }

  public componentWillUnmount() {
    browser.runtime.onMessage.removeListener(this.listener);
  }
}
