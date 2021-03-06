import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/messaging";

const styles = require("../photon.scss");

export class Textbox extends React.Component<IOptionControl, {}> {
  public render() {
    const id = String(this.props.name);

    return (
      <OptionsContext.Consumer>
        {ctx => {
          if (ctx.options == null) {
            return;
          }
          const value = ctx.options[this.props.name];

          return (
            <div className={styles.row}>
              <label htmlFor={id}>
                <input
                  {...this.props}
                  className={styles.textbox}
                  type="text"
                  id={id}
                  value={(value as string) || ""}
                  onClick={evt => {
                    if (this.props.onClick) {
                      this.props.onClick(evt);
                    }
                  }}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    CoreActions.optionsUpdate({ [id]: evt.target.value });
                  }}
                />
                <span className={styles.label}>{this.props.label}</span>
                {this.props.badge}
                {this.props.children}
              </label>
            </div>
          );
        }}
      </OptionsContext.Consumer>
    );
  }
}
