import React, { useState } from "react";

import { Button } from "@src/core/components/controls";
import { TL } from "@src/tl";
import { CoreActions } from "@src/core/coreMessaging";

export interface IExportSettingsState {
  kv?: Record<string, number | string | boolean>;
}

export const ExportSettingsButton: React.FC = () => {
  const [state, setState] = useState<IExportSettingsState>({});

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
    >
      <div>
        <Button
          onClick={() => {
            setState({});
            CoreActions.optionsGet().then((options) => {
              const kv: Record<string, number | string | boolean> = {};
              Object.entries(options).forEach(([k, v]) => {
                kv[k] = v.value;
              });
              setState({ kv });
            });
          }}
          style={{ marginLeft: "8px" }}
          data-testid="export-button"
        >
          {TL.oExportSettings}
        </Button>
      </div>

      {state.kv ? (
        <textarea
          style={{
            fontFamily: "monospace",
            marginLeft: "8px",
            marginTop: "4px",
          }}
          spellCheck={false}
          value={JSON.stringify(state.kv, null, 2) || ""}
          readOnly
        />
      ) : null}
    </div>
  );
};
