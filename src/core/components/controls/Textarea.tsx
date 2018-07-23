import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/messaging";

const styles = require("../photon.scss");

export class Textarea extends React.Component<IOptionControl, {}> {
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
                <span className={styles.label}>{this.props.label}</span>
                {this.props.badge}
                <textarea
                  {...this.props}
                  className={styles.textarea}
                  id={id}
                  value={(value as string) || ""}
                  onClick={evt => {
                    if (this.props.onClick) {
                      this.props.onClick(evt);
                    }
                  }}
                  onInput={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                    CoreActions.optionsUpdate({ [id]: evt.target.value });
                    if (this.props.onChange) {
                      this.props.onChange(evt);
                    }
                  }}
                />
              </label>
            </div>
          );
        }}
      </OptionsContext.Consumer>
    );
  }
}
