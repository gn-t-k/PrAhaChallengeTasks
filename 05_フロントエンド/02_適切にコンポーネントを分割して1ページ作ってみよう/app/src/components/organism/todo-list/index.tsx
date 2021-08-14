import TodoItem from "components/molecule/todo-item";
import { Data } from "domain/todo/models/data";

const TodoList = (props: {
  data: Data[];
  removeData: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}): JSX.Element => {
  const { removeData, toggleComplete } = props;

  return (
    <ul>
      {props.data.map((data) => (
        <TodoItem key={data.id} {...{ data, removeData, toggleComplete }} />
      ))}
    </ul>
  );
};

export default TodoList;
