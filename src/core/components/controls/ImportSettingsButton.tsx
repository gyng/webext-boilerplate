import React from "react";
import { TL } from "@src/tl";
import { Button } from "@src/core/components/controls";
import { getBrowser } from "@src/core/browser-detector";
import { CoreActions } from "@src/core/coreMessaging";

export const ImportSettingsButton: React.FC = () => {
  return (
    <Button
      onClick={() => {
        const load = (w: Window) => {
          CoreActions.optionsGet().then(() => {
            const json = w.prompt("Paste settings to import");
            try {
              if (json) {
                const imported = JSON.parse(json);
                CoreActions.optionsUpdate(imported);
                w.alert("Settings loaded.");
              }
            } catch (e) {
              w.alert(`Failed to load settings ${e}`);
            }
          });
        };

        getBrowser().then(() => {
          load(window);
        });
      }}
    >
      {TL.oImportSettings}
    </Button>
  );
};
