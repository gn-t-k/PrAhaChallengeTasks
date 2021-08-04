import styles from "components/atom/author-thumbnail/styles.module.css";

type Props = {
  src: string;
  authorName: string;
};

const AuthorThumbnail = (props: Props): JSX.Element => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={props.src} alt={props.authorName} className={styles.image} />
);

export default AuthorThumbnail;
