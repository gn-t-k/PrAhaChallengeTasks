import { useState } from "react";

const TodoForm = (props: {
  onTaskSubmit: (task: string) => void;
}): JSX.Element => {
  const [text, setText] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(() => event.target.value);
  };

  const doSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onTaskSubmit(text);
    setText("");
  };

  // TODO: ちゃんとやるなら、もうちょっとコンポーネント細かく分けたい
  return (
    <div>
      <form onSubmit={doSubmit}>
        <div>
          <label htmlFor="task">Task</label>
          <div>
            <input
              type="text"
              placeholder="What do you need to do?"
              value={text}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <input type="submit" value="Save Item" />
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
