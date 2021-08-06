import Link from "next/link";
import styles from "components/atom/post-heading/styles.module.css";

type Props = {
  text: string;
  href: string;
};

const PostHeading = (props: Props): JSX.Element => (
  <Link href={props.href}>
    <a className={styles.text}>{props.text}</a>
  </Link>
);

export default PostHeading;
