import * as React from "react";
import { l10n } from "@vendor/l10n/l10n";
import { OptionSchema } from "@src/background/core/options";
import { importSettings, exportSettings } from "@src/options/core/importExport";
import { actions, IMessage, MessageType } from "@src/background/core/messaging";
const styles = require("./styles.scss");

export interface IOptionControl {
  name: string;
  options: typeof OptionSchema;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
}

const Button = (props: IButtonProps) => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export interface IExportSettingsState {
  options?: typeof OptionSchema;
}

class ExportSettingsButton extends React.Component<{}, IExportSettingsState> {
  public constructor(props: IExportSettingsState) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <div>
        <Button
          onClick={() => {
            exportSettings(options => this.setState({ options }));
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
              actions.optionsUpdate({ [id]: evt.target.checked });
            }}
          />
          {this.props.children}
        </label>
      </div>
    );
  }
}

export interface IOptionsPageState {
  options: typeof OptionSchema;
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
      actions.optionsGet().then(options => {
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
          <div id="reset" className="button float-right">
            __MSG_oRestoreDefaults__
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
