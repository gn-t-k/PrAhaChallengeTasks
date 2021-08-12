import Link from "next/link";
import styles from "components/atom/category/styles.module.css";

type Props = {
  text: string;
  href: string;
};

const Category = (props: Props): JSX.Element => (
  <Link href={props.href}>
    <a className={styles.text}>- {props.text}</a>
  </Link>
);

export default Category;
