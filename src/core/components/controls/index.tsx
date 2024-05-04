import { HTMLProps, ReactNode } from "react";

export * from "@src/core/components/controls/Button";
export * from "@src/core/components/controls/Checkbox";
export * from "@src/core/components/controls/Select";
export * from "@src/core/components/controls/Textbox";
export * from "@src/core/components/controls/Textarea";
export * from "@src/core/components/controls/ExportSettingsButton";
export * from "@src/core/components/controls/ResetSettingsButton";
export * from "@src/core/components/controls/ImportSettingsButton";

export interface IOptionControl<T = HTMLInputElement> extends HTMLProps<T> {
  name: string;
  badge?: ReactNode;
  labelEl?: ReactNode;
}

export interface IButtonControl extends HTMLProps<HTMLButtonElement> {
  badge?: ReactNode;
  labelEl?: ReactNode;
}
