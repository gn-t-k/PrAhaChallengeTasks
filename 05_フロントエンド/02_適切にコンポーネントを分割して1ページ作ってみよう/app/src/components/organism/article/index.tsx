import ArticleDate from "components/atom/article-date";
import ArticleDescription from "components/atom/article-description";
import ArticleHeading from "components/atom/article-heading";
import ArticleReadMore from "components/atom/article-read-more";
import ArticleTag from "components/atom/article-tag";
import ArticleAuthor from "components/molecule/article-author";
import styles from "components/organism/article/styles.module.css";

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

const Article = (props: Props): JSX.Element => (
  <div className={styles.container}>
    <div className={styles.top}>
      <ArticleDate date={props.date} />
      <ArticleTag label={props.tagLabel} href={props.tagHref} />
    </div>
    <div className={styles.middle}>
      <ArticleHeading text={props.title} href={props.href} />
      <div className={styles.description}>
        <ArticleDescription text={props.description} />
      </div>
    </div>
    <div className={styles.bottom}>
      <ArticleReadMore href={props.href} />
      <ArticleAuthor
        authorName={props.authorName}
        authorHref={props.authorHref}
        thumbnailSrc={props.thumbnailSrc}
      />
    </div>
  </div>
);

export default Article;
