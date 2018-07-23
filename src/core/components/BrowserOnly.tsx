import React, { ReactElement } from "react";

import { BROWSERS, getBrowser } from "@src/core/browser-detector";

const styles = require("./photon.scss");

export interface IBrowserOnlyProps {
  browser: BROWSERS;
  children: ReactElement<any>;
}

export interface IBrowserOnlyState {
  currentBrowser: BROWSERS;
}

export class BrowserOnly extends React.Component<
  IBrowserOnlyProps,
  IBrowserOnlyState
> {
  public constructor(props: IBrowserOnlyProps) {
    super(props);

    this.state = {
      currentBrowser: BROWSERS.UNKNOWN
    };
  }

  public render() {
    const disabled = this.props.browser !== this.state.currentBrowser;

    const badge = {
      [BROWSERS.FIREFOX]: <span className={styles.badge}>Firefox</span>,
      [BROWSERS.CHROME]: <span className={styles.badge}>Chrome</span>,
      [BROWSERS.UNKNOWN]: null
    }[this.props.browser];

    return (
      <div>{React.cloneElement(this.props.children, { disabled, badge })}</div>
    );
  }

  public componentDidMount() {
    getBrowser().then(currentBrowser => {
      this.setState({ currentBrowser });
    });
  }
}
