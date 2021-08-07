/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import PostDate from "components/atom/post-date";
import styles from "components/organism/recent-post/styles.module.css";

type Props = {
  tagHref: string;
  tagText: string;
  postHref: string;
  postTitle: string;
  authorName: string;
  authorHref: string;
  authorThumbnailSrc: string;
  postDate: Date;
};

const RecentPost = (props: Props): JSX.Element => (
  // TODO: コンポーネント分割
  <div className={styles.container}>
    <div className={styles.top}>
      <Link href={props.tagHref}>
        <a className={styles.tag}>{props.tagText}</a>
      </Link>
    </div>
    <div className={styles.middle}>
      <Link href={props.postHref}>
        <a className={styles.postTitle}>{props.postTitle}</a>
      </Link>
    </div>
    <div className={styles.bottom}>
      <div className={styles.author}>
        <img
          src={props.authorThumbnailSrc}
          alt={props.authorName}
          className={styles.authorImage}
        />
        <Link href={props.authorHref}>
          <a className={styles.authorName}>{props.authorName}</a>
        </Link>
      </div>
      <div className={styles.postDate}>
        <PostDate date={props.postDate} />
      </div>
    </div>
  </div>
);

export default RecentPost;
