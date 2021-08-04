import styles from "components/atom/article-description/styles.module.css";

type Props = {
  text: string;
};

const ArticleDescription = (props: Props): JSX.Element => (
  <p className={styles.text}>{props.text}</p>
);

export default ArticleDescription;
