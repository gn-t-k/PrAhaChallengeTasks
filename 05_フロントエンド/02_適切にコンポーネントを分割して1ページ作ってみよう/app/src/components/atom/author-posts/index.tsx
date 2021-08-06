import styles from "components/atom/author-posts/styles.module.css";

type Props = {
  amount: number;
};

const AuthorPosts = (props: Props): JSX.Element => (
  <p className={styles.text}>Created {props.amount} Posts</p>
);

export default AuthorPosts;
