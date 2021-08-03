import Link from "next/link";
import styles from "components/atom/article-tag/styles.module.css";

type Props = {
  label: string;
  href: string;
};

const ArticleTag = (props: Props): JSX.Element => (
  <span className={styles.tag}>
    <Link href={props.href}>
      <a>props.label</a>
    </Link>
  </span>
);

export default ArticleTag;
