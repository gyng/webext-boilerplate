import browser from "webextension-polyfill";
import React from "react";

import {
  ExportSettingsButton,
  ImportSettingsButton,
} from "@src/core/components/controls";
import { ResetSettingsButton } from "./controls/ResetSettingsButton";
import { CoreMessageType, isOwnMessage } from "@src/core/coreMessaging";
import { TL } from "@src/tl";

export const SettingsSection: React.FC = () => {
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const listener = (request: any) => {
      if (!isOwnMessage(request)) {
        return;
      }
      switch (request.type) {
        case CoreMessageType.OPTIONS_UPDATE_SUCCESS:
          setLastUpdated(new Date());
          break;
        default:
          break;
      }
    };
    browser.runtime.onMessage.addListener(listener);
    return () => {
      browser.runtime.onMessage.removeListener(listener);
    };
  }, []);

  return (
    <>
      <h2 id="section-more-options">
        {TL.oMoreOptions}
        <div className="floatRight">
          <ResetSettingsButton />
        </div>
      </h2>

      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <ImportSettingsButton />
        <ExportSettingsButton />
      </div>

      <p>
        <span>{TL.oLastSavedAt}</span>
        <span id="lastSavedAt">
          {lastUpdated ? lastUpdated.toLocaleString() : TL.oLastSavedAtNever}
        </span>
      </p>
    </>
  );
};
