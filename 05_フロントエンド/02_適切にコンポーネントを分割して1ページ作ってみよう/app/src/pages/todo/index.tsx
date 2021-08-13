import React, { useState } from "react";

type Data = {
  id: string;
  task: string;
  complete: boolean;
};

const TodoBox = (): JSX.Element => {
  const [data, setData] = useState<Data[]>([]);
  const generateID = () =>
    (Math.floor(Math.random() * 90000) + 10000).toString();
  const handleNodeRemoval = (nodeID: string) => {
    setData(data.filter((el) => el.id !== nodeID));
  };
  const handleSubmit = (task: string) => {
    setData(
      data.concat({
        id: generateID(),
        task,
        complete: false,
      })
    );
  };
  const handleToggleComplete = (nodeID: string) => {
    setData(
      data.map((d) =>
        d.id === nodeID ? { id: d.id, task: d.task, complete: !d.complete } : d
      )
    );
  };

  return (
    <div>
      <h1>To do:</h1>
      <TodoList
        data={data}
        removeNode={handleNodeRemoval}
        toggleComplete={handleToggleComplete}
      />
      <TodoForm onTaskSubmit={handleSubmit} />
    </div>
  );
};

const TodoList = (props: {
  data: Data[];
  removeNode: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}): JSX.Element => {
  const removeNode = (nodeID: string) => {
    props.removeNode(nodeID);
  };
  const toggleComplete = (nodeID: string) => {
    props.toggleComplete(nodeID);
  };

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

const TodoItem = (props: {
  data: Data;
  removeNode: (nodeID: string) => void;
  toggleComplete: (nodeID: string) => void;
}) => {
  const removeNode = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.removeNode(props.data.id);
  };
  const toggleComplete = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.toggleComplete(props.data.id);
  };

  return (
    <li>
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

export default TodoBox;
