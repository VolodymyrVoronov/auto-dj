import { ComponentProps } from "react";
import cn from "classnames";

import styles from "./Button.module.css";

interface IButtonProps extends ComponentProps<"button"> {}

const Button = ({
  className,

  children,

  ...rest
}: IButtonProps): JSX.Element => {
  return (
    <button className={cn(styles["root"], className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
