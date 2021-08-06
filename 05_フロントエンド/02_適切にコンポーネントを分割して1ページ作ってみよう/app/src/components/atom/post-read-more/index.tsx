import Link from "next/link";
import styles from "components/atom/post-read-more/styles.module.css";

type Props = {
  href: string;
};

const PostReadMore = (props: Props): JSX.Element => (
  <Link href={props.href}>
    <a className={styles.text}>Read more</a>
  </Link>
);

export default PostReadMore;
