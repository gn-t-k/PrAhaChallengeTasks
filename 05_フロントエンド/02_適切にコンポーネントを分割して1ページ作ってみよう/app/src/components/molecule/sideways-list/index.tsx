import styles from "components/molecule/sideways-list/styles.module.css";

type Child = [id: string, component: JSX.Element];

type Props = {
  children: Child[];
};

const SidewaysList = (props: Props): JSX.Element => (
  <ul className={styles.list}>
    {props.children.map((child) => {
      const id = child[0];
      const component = child[1];

      return (
        <li key={id} className={styles.item}>
          {component}
        </li>
      );
    })}
  </ul>
);

export default SidewaysList;
