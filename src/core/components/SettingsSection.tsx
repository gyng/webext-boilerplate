import React from "react";

import { Button, ExportSettingsButton } from "@src/core/components/controls";
import { CoreMessageType, isOwnMessage } from "@src/core/messaging";
import { importSettings, resetSettings } from "@src/core/options/ui";
import { TL } from "@src/tl";

export const SettingsSection: React.FC = () => {
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const listener: browser.runtime.onMessageVoid = (request) => {
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
          <Button onClick={resetSettings}>{TL.oRestoreDefaults}</Button>
        </div>
      </h2>

      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Button onClick={importSettings}>{TL.oImportSettings}</Button>
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
