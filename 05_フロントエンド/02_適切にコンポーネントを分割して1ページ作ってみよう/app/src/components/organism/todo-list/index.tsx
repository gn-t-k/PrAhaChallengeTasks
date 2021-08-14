import TodoItem from "components/molecule/todo-item";
import { Data } from "domain/models/data";

const TodoList = (props: {
  data: Data[];
  removeNode: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}): JSX.Element => {
  const { removeNode, toggleComplete } = props;

  return (
    <ul>
      {props.data.map((d) => (
        <TodoItem
          key={d.id}
          data={d}
          removeNode={removeNode}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
