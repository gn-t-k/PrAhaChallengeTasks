import styles from "components/atom/selectbox/styles.module.css";

type Props = {
  options: string[];
};

const Selectbox = (props: Props): JSX.Element => (
  <select className={styles.selectbox}>
    {props.options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </select>
);

export default Selectbox;
