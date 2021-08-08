import styles from "components/atom/author-name/styles.module.css";

type Props = {
  text: string;
};

const AuthorName = (props: Props): JSX.Element => (
  <span className={styles.text}>{props.text}</span>
);

export default AuthorName;
