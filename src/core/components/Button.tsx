import React from "react";
const styles = require("./styles.scss");

export interface IButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
}

export default (props: IButtonProps) => {
  return (
    <div className={styles.button} onClick={props.onClick}>
      {props.children}
    </div>
  );
};
