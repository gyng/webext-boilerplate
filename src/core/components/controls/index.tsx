export * from "@src/core/components/controls/Button";
export * from "@src/core/components/controls/Checkbox";
export * from "@src/core/components/controls/Select";
export * from "@src/core/components/controls/Textbox";
export * from "@src/core/components/controls/Textarea";
export * from "@src/core/components/controls/ExportSettingsButton";

export interface IOptionControl {
  name: string;
  disabled?: boolean;
  badge?: JSX.Element;
  label?: JSX.Element | string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onClick?: (
    e: React.MouseEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}
