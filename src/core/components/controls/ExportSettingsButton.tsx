import React, { useState } from "react";

import { Button } from "@src/core/components/controls";
import { exportSettings } from "@src/core/options/ui";
import { TL } from "@src/tl";

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
            exportSettings.then((kv) => setState({ kv }));
          }}
          style={{ marginLeft: "8px" }}
          data-testid="export-button"
        >
          {TL.oExportSettings}
        </Button>
      </div>

      <textarea
        style={{
          display: state.kv ? "block" : "none",
          fontFamily: "monospace",
          marginLeft: "8px",
          marginTop: "4px",
        }}
        spellCheck={false}
        defaultValue={JSON.stringify(state.kv, null, 2) || ""}
      />
    </div>
  );
};
