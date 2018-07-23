import { l10n } from "@vendor/l10n/l10n";
import * as React from "react";

import { SettingsSection } from "@src/core/components";
import { CoreActions, CoreMessageType, IMessage } from "@src/core/messaging";
import { IOptions, IOptionsSchema } from "@src/core/options";
import { schema } from "@src/schema";

export interface IOptionsPageContainerState {
  options: IOptions;
  children?: React.ReactChildren;
}

export const OptionsContext: React.Context<{
  options?: IOptions;
  schema?: IOptionsSchema;
}> = React.createContext({});

export class OptionsPageContainer extends React.Component<
  {},
  IOptionsPageContainerState
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
      <OptionsContext.Provider value={{ options: this.state.options, schema }}>
        <div>
          {this.props.children}

          <hr />

          <SettingsSection />
        </div>
      </OptionsContext.Provider>
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
