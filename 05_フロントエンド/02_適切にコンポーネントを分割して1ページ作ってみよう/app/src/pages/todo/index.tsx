import TodoBox from "components/template/todo";
import { useTodoData } from "hooks/use-todo-data";

const Todo = (): JSX.Element => {
  const { data, registerData, toggleComplete, removeData } = useTodoData();

  return <TodoBox {...{ data, registerData, toggleComplete, removeData }} />;
};

export default Todo;
