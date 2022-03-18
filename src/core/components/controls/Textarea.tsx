import React from "react";

import { IOptionControl } from "@src/core/components/controls";
import { OptionsContext } from "@src/core/components/OptionsPageContainer";
import { CoreActions } from "@src/core/messaging";
import { isValidOptionKey } from "@src/core/options/ui";

export const Textarea: React.FC<IOptionControl<HTMLTextAreaElement>> = (
  props
) => {
  const { badge, labelEl, ...passdown } = props;

  return (
    <OptionsContext.Consumer>
      {(ctx) => {
        if (ctx.options == null) {
          return;
        }
        if (!isValidOptionKey(props.name)) {
          return `Unlinked Textarea: ${props.name}`;
        }
        const value = ctx.options[props.name];
        const id = props.name;

        return (
          <div className="row">
            <label htmlFor={id}>
              <span className="label">{labelEl}</span>
              {badge}
              <textarea
                {...passdown}
                className="textarea"
                id={id}
                value={value.value as string}
                onClick={(evt) => {
                  if (props.onClick) {
                    props.onClick(evt);
                  }
                }}
                onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
                  CoreActions.optionsUpdate({ [id]: evt.target.value });
                  if (props.onChange) {
                    props.onChange(evt);
                  }
                }}
              />
            </label>
          </div>
        );
      }}
    </OptionsContext.Consumer>
  );
};
