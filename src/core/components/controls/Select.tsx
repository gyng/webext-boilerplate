import React, { ReactNode } from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/coreMessaging";
import { isValidOptionKey } from "@src/core/options/ui";

export interface ISelectProps extends IOptionControl<HTMLSelectElement> {
  options: { label?: ReactNode; value: string }[];
}

export const Select: React.FC<ISelectProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { badge, labelEl, ...passdown } = props;

  return (
    <OptionsContext.Consumer>
      {(ctx) => {
        if (ctx.options == null) {
          return "Options not loaded";
        }

        if (!isValidOptionKey(props.name)) {
          return `Unlinked Textarea: ${props.name}`;
        }
        const value = ctx.options[props.name];
        const id = props.name;

        return (
          <div className="row">
            <label htmlFor={id}>
              <select
                {...passdown}
                id={id}
                data-testid={id}
                value={value.value as string}
                className="select"
                onClick={(evt) => {
                  if (props.onClick) {
                    props.onClick(evt);
                  }
                }}
                onChange={(evt: React.ChangeEvent<HTMLSelectElement>) => {
                  CoreActions.optionsUpdate({ [id]: evt.target.value });
                  if (props.onChange) {
                    props.onChange(evt);
                  }
                }}
              >
                {props.options.map((opt) => (
                  <option value={opt.value} key={opt.value}>
                    {opt.label || opt.value}
                  </option>
                ))}
              </select>
              <span className="label">{props.labelEl}</span>
              {props.badge}
              {props.children}
            </label>
          </div>
        );
      }}
    </OptionsContext.Consumer>
  );
};
