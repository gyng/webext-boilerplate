import React from "react";
const styles = require("../photon.scss");

export interface IButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
}

export const Button = (props: IButtonProps) => {
  return (
    <div {...props} className={styles.button} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
