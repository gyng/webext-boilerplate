import { l10n } from "@vendor/l10n/l10n";
import * as React from "react";

import { SettingsSection } from "@src/core/components";
import {
  CoreActions,
  CoreMessageType,
  isOwnMessage,
} from "@src/core/coreMessaging";
import { TL } from "@src/tl";
import { Options } from "@src/schema";

export interface IOptionsPageContainerState {
  options: Options | null;
  children?: React.ReactChildren;
}

export const OptionsContext: React.Context<{
  /** Can either be unpopulated or populated */
  options?: Options;
}> = React.createContext({});

export class OptionsPageContainer extends React.Component<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  IOptionsPageContainerState
> {
  private updateState: () => void;
  private listener: (requestObj: object) => void;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(props: any) {
    super(props);

    this.updateState = () => {
      CoreActions.optionsGet().then((options) => {
        this.setState({ options });
      });
    };

    this.listener = (request: object) => {
      if (!isOwnMessage(request)) {
        return;
      }
      if (request.type === CoreMessageType.OPTIONS_UPDATE_SUCCESS) {
        this.updateState();
      }
    };
    this.state = { options: null };
  }

  public render() {
    return !this.state.options ? (
      TL.oLoadingOptions
    ) : (
      <OptionsContext.Provider value={{ options: this.state.options }}>
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
