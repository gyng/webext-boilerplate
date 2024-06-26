import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/coreMessaging";
import { isValidOptionKey } from "@src/core/options/ui";

export const Checkbox: React.FC<IOptionControl> = (props) => {
  const { badge, labelEl, ...passdown } = props;

  return (
    <OptionsContext.Consumer>
      {(ctx) => {
        if (ctx.options == null) {
          return "Options not loaded";
        }

        if (!isValidOptionKey(props.name)) {
          return <div>Unlinked Checkbox: props.name</div>;
        }
        const checked = ctx.options[props.name];
        const id = props.name;

        return (
          <div className="row">
            <label htmlFor={id}>
              <input
                {...passdown}
                type="checkbox"
                data-testid={id}
                id={id}
                checked={Boolean(checked.value)}
                onClick={(evt) => {
                  if (props.onClick) {
                    props.onClick(evt);
                  }
                }}
                onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                  CoreActions.optionsUpdate({ [id]: evt.target.checked });
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
