import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/coreMessaging";
import { isValidOptionKey } from "@src/core/options/ui";

export const Textbox: React.FC<IOptionControl<HTMLInputElement>> = (props) => {
  const { badge, labelEl, ...passdown } = props;

  return (
    <OptionsContext.Consumer>
      {(ctx) => {
        if (ctx.options == null) {
          return "Options not loaded";
        }

        if (!isValidOptionKey(props.name)) {
          return <div>Unlinked Textbox: props.name</div>;
        }
        const value = ctx.options[props.name];
        const id = props.name;

        return (
          <div className="row">
            <label htmlFor={id}>
              <input
                data-testid={id}
                {...passdown}
                className="textbox"
                type="text"
                id={id}
                value={value.value as string}
                onClick={(evt) => {
                  if (props.onClick) {
                    props.onClick(evt);
                  }
                }}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  CoreActions.optionsUpdate({ [id]: evt.target.value });
                }}
              />
              <span className="label">{labelEl}</span>
              {badge}
              {props.children}
            </label>
          </div>
        );
      }}
    </OptionsContext.Consumer>
  );
};
