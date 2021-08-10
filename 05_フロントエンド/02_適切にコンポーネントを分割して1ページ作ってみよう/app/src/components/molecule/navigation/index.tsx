import styles from "components/molecule/navigation/styles.module.css";

type Child = [id: string, component: JSX.Element];

type Props = {
  children: Child[];
};

const Navigation = (props: Props): JSX.Element => (
  <>
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
    <span className={styles.button}>
      <svg viewBox="0 0 24 24">
        <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
      </svg>
    </span>
  </>
);

export default Navigation;
