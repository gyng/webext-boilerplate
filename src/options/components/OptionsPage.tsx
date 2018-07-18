import * as React from "react";
import { l10n } from "@vendor/l10n/l10n";
import { schema } from "@src/schema";
import {
  importSettings,
  resetSettings
} from "@src/core/options/ui";
import { Actions, IMessage, MessageType } from "@src/core/messaging";
import Button from "@src/core/components/Button";
import ExportSettingsButton from "@src/core/components/ExportSettingsButton";
const styles = require("@src/core/components/styles.scss");

export interface IOptionControl {
  name: string;
  options: typeof schema;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// todo: onclick, update options
export class Checkbox extends React.Component<IOptionControl, {}> {
  public render() {
    const id = String(this.props.name);
    const disabled = this.props.options == null;
    let checked = this.props.options
      ? this.props.options[this.props.name]
      : false;

    return (
      <div>
        <label htmlFor={id}>
          <input
            disabled={disabled}
            type="checkbox"
            id={id}
            checked={checked as boolean}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              Actions.optionsUpdate({ [id]: evt.target.checked });
            }}
          />
          {this.props.children}
        </label>
      </div>
    );
  }
}

export interface IOptionsPageState {
  options: typeof schema;
}

export default class OptionsPage extends React.Component<
  {},
  IOptionsPageState
> {
  updateState: () => void;
  listener: (requestObj: object) => void;

  public constructor(props: {}) {
    super(props);

    this.updateState = () => {
      Actions.optionsGet().then(options => {
        this.setState({ options });
      });
    };

    this.listener = (requestObj: object) => {
      const request = requestObj as IMessage;

      if (request.type === MessageType.OPTIONS_UPDATED) {
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
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
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
