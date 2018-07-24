import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/messaging";

const styles = require("../photon.scss");

export interface ISelectProps extends IOptionControl {
  options: any[];
}

export class Select extends React.Component<ISelectProps, {}> {
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
                <select
                  {...this.props}
                  id={id}
                  value={value as string}
                  className={styles.select}
                  onClick={evt => {
                    if (this.props.onClick) {
                      this.props.onClick(evt);
                    }
                  }}
                  onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
                    CoreActions.optionsUpdate({ [id]: evt.target.value });
                    if (this.props.onChange) {
                      this.props.onChange(evt);
                    }
                  }}
                >
                  {this.props.options.map(opt => (
                    <option value={opt.value} key={opt.value}>
                      {opt.label || opt.value}
                    </option>
                  ))}
                </select>
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
