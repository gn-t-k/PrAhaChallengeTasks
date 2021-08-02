import styles from "components/atom/heading/styles.module.css";

type Props = {
  text: string;
};

const Heading = (props: Props): JSX.Element => (
  <p className={styles.text}>{props.text}</p>
);

export default Heading;
