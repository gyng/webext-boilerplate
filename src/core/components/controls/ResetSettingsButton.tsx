import React from "react";
import { TL } from "@src/tl";
import { Button } from "@src/core/components/controls";
import { getBrowser } from "@src/core/browser-detector";
import { CoreActions } from "@src/core/coreMessaging";

export const ResetSettingsButton: React.FC = () => {
  return (
    <Button
      onClick={() => {
        const resetFn = (win: Window) => {
          const reset = win.confirm("Reset settings to defaults?");
          if (reset) {
            CoreActions.optionsReset().then(() => {
              window.location.reload();
            });
          }
        };

        getBrowser().then(() => {
          resetFn(window);
        });
      }}
    >
      {TL.oRestoreDefaults}
    </Button>
  );
};
