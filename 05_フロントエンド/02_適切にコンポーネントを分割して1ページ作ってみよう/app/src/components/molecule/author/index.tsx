import AuthorName from "components/atom/author-name";
import AuthorPosts from "components/atom/author-posts";
import AuthorThumbnail from "components/atom/author-thumbnail";
import styles from "components/molecule/author/styles.module.css";

type Props = {
  authorName: string;
  thumbnailSrc: string;
  authorPostsAmount: number;
};

const Author = (props: Props): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.thumbnail}>
      <AuthorThumbnail authorName={props.authorName} src={props.thumbnailSrc} />
    </div>
    <div className={styles.text}>
      <span className={styles.name}>
        <AuthorName text={props.authorName} />
      </span>
      <AuthorPosts amount={props.authorPostsAmount} />
    </div>
  </div>
);

export default Author;
