import styles from "components/molecule/todo-item/styles.module.css";
import { Data } from "domain/todo/models/data";

const TodoItem = (props: {
  data: Data;
  removeData: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}): JSX.Element => {
  const removeData = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.removeData(props.data.id);
  };
  const toggleComplete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.toggleComplete(props.data.id);
  };

  // TODO: ちゃんとやるなら、task, complete-button, remove-buttonでatomに分けたい
  return (
    <li className={props.data.complete ? styles.completed : ""}>
      {props.data.task}
      <div>
        <button type="button" onClick={toggleComplete}>
          &#x2713;
        </button>
        <button type="button" onClick={removeData}>
          &#xff38;
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
