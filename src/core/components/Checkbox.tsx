import React from "react";

import { CoreActions } from "@src/core/messaging";
import { IOptionControl } from "@src/options/components/OptionsPage";

// todo: onclick, update options
export class Checkbox extends React.Component<IOptionControl, {}> {
  public render() {
    const id = String(this.props.name);
    const disabled = this.props.options == null;
    const checked = this.props.options
      ? this.props.options[this.props.name]
      : false;

    return (
      <div>
        <label htmlFor={id}>
          <input
            disabled={disabled}
            type="checkbox"
            id={id}
            checked={(checked as boolean) || false}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              CoreActions.optionsUpdate({ [id]: evt.target.checked });
            }}
          />
          {this.props.children}
        </label>
      </div>
    );
  }
}