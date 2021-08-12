import PostDate from "components/atom/post-date";
import PostDescription from "components/atom/post-description";
import PostHeading from "components/atom/post-heading";
import PostReadMore from "components/atom/post-read-more";
import PostTag from "components/atom/post-tag";
import PostAuthor from "components/molecule/post-author";
import styles from "components/organism/post/styles.module.css";

type Props = {
  date: Date;
  tagLabel: string;
  tagHref: string;
  title: string;
  href: string;
  description: string;
  authorName: string;
  authorHref: string;
  thumbnailSrc: string;
};

const Post = (props: Props): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.top}>
      <PostDate date={props.date} />
      <PostTag label={props.tagLabel} href={props.tagHref} />
    </div>
    <div className={styles.middle}>
      <PostHeading text={props.title} href={props.href} />
      <div className={styles.description}>
        <PostDescription text={props.description} />
      </div>
    </div>
    <div className={styles.bottom}>
      <PostReadMore href={props.href} />
      <PostAuthor
        authorName={props.authorName}
        authorHref={props.authorHref}
        thumbnailSrc={props.thumbnailSrc}
      />
    </div>
  </div>
);

export default Post;
