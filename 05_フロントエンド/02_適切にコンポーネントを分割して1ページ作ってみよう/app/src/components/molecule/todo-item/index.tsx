import styles from "components/molecule/todo-item/styles.module.css";
import { Data } from "domain/models/data";

const TodoItem = (props: {
  data: Data;
  removeNode: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}): JSX.Element => {
  const removeNode = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.removeNode(props.data.id);
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
        <button type="button" onClick={removeNode}>
          &#xff38;
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
