import styles from "components/atom/post-description/styles.module.css";

type Props = {
  text: string;
};

const PostDescription = (props: Props): JSX.Element => (
  <p className={styles.text}>{props.text}</p>
);

export default PostDescription;
