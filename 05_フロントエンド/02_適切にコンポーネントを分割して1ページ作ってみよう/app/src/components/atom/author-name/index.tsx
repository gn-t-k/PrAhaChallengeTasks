import styles from "components/atom/author-name/styles.module.css";

type Props = {
  text: string;
};

const AuthorName = (props: Props): JSX.Element => (
  <p className={styles.text}>{props.text}</p>
);

export default AuthorName;
