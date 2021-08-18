import styles from "components/atom/button/styles.module.css";

type Color = "red" | "blue" | "green";

type Size = "small" | "medium" | "large";

export type Props = {
  color: Color;
  size: Size;
  disabled: boolean;
  onClick: () => void;
};

const Button = ({
  color,
  size,
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<Props>): JSX.Element => {
  const className = [styles[color], styles[size]].join(" ");

  return <button {...{ className, onClick, disabled }}>{children}</button>;
};

export default Button;
