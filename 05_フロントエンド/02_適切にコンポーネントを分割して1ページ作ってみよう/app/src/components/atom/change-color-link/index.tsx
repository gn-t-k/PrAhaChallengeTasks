import Link from "next/link";
import styles from "components/atom/change-color-link/styles.module.css";

type Props = {
  text: string;
  href: string;
};

const ChangeColorLink = (props: Props): JSX.Element => (
  <Link href={props.href}>
    <a className={styles.text}>{props.text}</a>
  </Link>
);

export default ChangeColorLink;
