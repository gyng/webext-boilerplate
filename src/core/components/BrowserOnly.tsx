import React, { ReactElement } from "react";

import { BROWSERS, getBrowser } from "@src/core/browser-detector";

export interface IBrowserOnlyProps {
  browser: BROWSERS;
  children: ReactElement;
}

export const BrowserOnly: React.FC<IBrowserOnlyProps> = (props) => {
  const [currentBrowser, setCurrentBrowser] = React.useState<BROWSERS>(
    BROWSERS.UNKNOWN
  );
  React.useEffect(() => {
    getBrowser().then((currentBrowser) => {
      setCurrentBrowser(currentBrowser);
    });
  }, []);

  const disabled = props.browser !== currentBrowser;
  const badge = {
    [BROWSERS.FIREFOX]: <span className="badge">Firefox</span>,
    [BROWSERS.CHROME]: <span className="badge">Chrome</span>,
    [BROWSERS.UNKNOWN]: null,
  }[props.browser];

  return React.cloneElement(props.children, { disabled, badge });
};
