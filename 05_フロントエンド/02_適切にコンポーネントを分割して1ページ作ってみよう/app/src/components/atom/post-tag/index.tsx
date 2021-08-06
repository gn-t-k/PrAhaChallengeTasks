import Link from "next/link";
import styles from "components/atom/post-tag/styles.module.css";

type Props = {
  label: string;
  href: string;
};

const PostTag = (props: Props): JSX.Element => (
  <span className={styles.tag}>
    <Link href={props.href}>
      <a>{props.label}</a>
    </Link>
  </span>
);

export default PostTag;
