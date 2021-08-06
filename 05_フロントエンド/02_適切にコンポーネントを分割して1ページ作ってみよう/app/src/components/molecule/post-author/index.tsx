import Link from "next/link";
import AuthorName from "components/atom/author-name";
import AuthorThumbnail from "components/atom/author-thumbnail";
import styles from "components/molecule/post-author/styles.module.css";

type Props = {
  authorName: string;
  authorHref: string;
  thumbnailSrc: string;
};

const PostAuthor = (props: Props): JSX.Element => (
  <Link href={props.authorHref}>
    <a className={styles.container}>
      <AuthorThumbnail authorName={props.authorName} src={props.thumbnailSrc} />
      <AuthorName text={props.authorName} />
    </a>
  </Link>
);

export default PostAuthor;
