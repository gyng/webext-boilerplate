import { l10n } from "@vendor/l10n/l10n";
import * as React from "react";

import { Button, Checkbox, ExportSettingsButton } from "@src/core/components";
import { CoreActions, CoreMessageType, IMessage } from "@src/core/messaging";
import { IOptions } from "@src/core/options";
import { importSettings, resetSettings } from "@src/core/options/ui";

const styles = require("@src/core/components/styles.scss");

export interface IOptionControl {
  name: string;
  options: IOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IOptionsPageState {
  options: IOptions;
}

export default class OptionsPage extends React.Component<
  {},
  IOptionsPageState
> {
  private updateState: () => void;
  private listener: (requestObj: object) => void;

  public constructor(props: {}) {
    super(props);

    this.updateState = () => {
      CoreActions.optionsGet().then(options => {
        this.setState({ options });
      });
    };

    this.listener = (requestObj: object) => {
      const request = requestObj as IMessage;

      if (request.type === CoreMessageType.OPTIONS_UPDATED) {
        this.updateState();
      }
    };

    this.state = { options: {} };
  }

  public render() {
    return (
      <div>
        <h2>Hello, __MSG_extensionName__!</h2>

        <Checkbox options={this.state.options} name="foo">
          __MSG_oFoo__
        </Checkbox>

        <label>
          <h3>__MSG_oBar__</h3>
          <textarea id="bar" spellCheck={false} />
        </label>

        <hr />

        <h2 id="section-more-options">
          __MSG_oMoreOptions__
          <div className={styles["float-right"]}>
            <Button onClick={resetSettings}>__MSG_oRestoreDefaults__</Button>
          </div>
        </h2>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start"
          }}
        >
          <Button onClick={importSettings}>__MSG_oImportSettings__</Button>
          <ExportSettingsButton />
        </div>

        <p>
          <span>__MSG_oLastSavedAt__</span>
          <span id="lastSavedAt">__MSG_oLastSavedAtNever__</span>
        </p>
      </div>
    );
  }

  public componentDidMount() {
    browser.runtime.onMessage.addListener(this.listener);
    this.updateState();
    l10n.updateDocument();
  }

  public componentDidUpdate() {
    l10n.updateDocument();
  }

  public componentWillUnmount() {
    browser.runtime.onMessage.removeListener(this.listener);
  }
}
