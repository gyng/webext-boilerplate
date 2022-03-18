import React from "react";
import { IButtonControl } from ".";

export const Button = (props: IButtonControl) => {
  const { labelEl, badge, ...passdown } = props;

  return (
    <>
      {/** @ts-expect-error widened button type */}
      <button className="button" {...passdown}>
        {props.children}
      </button>
      {badge}
      {labelEl}
    </>
  );
};
