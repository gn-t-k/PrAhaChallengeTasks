import TodoForm from "components/organism/todo-form";
import TodoList from "components/organism/todo-list";
import { Data } from "domain/todo/models/data";

const TodoBox = (props: {
  data: Data[];
  removeData: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
  registerData: (task: string) => void;
}): JSX.Element => {
  const { data, removeData, toggleComplete, registerData } = props;

  return (
    <div>
      <h1>To do:</h1>
      <TodoList
        data={data}
        removeNode={removeData}
        toggleComplete={toggleComplete}
      />
      <TodoForm onTaskSubmit={registerData} />
    </div>
  );
};

export default TodoBox;
