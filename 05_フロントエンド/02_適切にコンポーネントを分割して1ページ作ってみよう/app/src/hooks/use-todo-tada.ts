import { useState } from "react";
import { Data } from "domain/models/data";
import { generateID } from "domain/services/generate-id";

type UseTodoData = () => {
  data: Data[];
  registerData: (task: string) => void;
  toggleComplete: (nodeID: string) => void;
  removeData: (nodeID: string) => void;
};

export const useTodoData: UseTodoData = () => {
  const [data, setData] = useState<Data[]>([]);

  const registerData = (task: string) => {
    setData(
      data.concat({
        id: generateID(),
        task,
        complete: false,
      })
    );
  };
  const toggleComplete = (nodeID: string) => {
    setData(
      data.map((d) =>
        d.id === nodeID ? { id: d.id, task: d.task, complete: !d.complete } : d
      )
    );
  };
  const removeData = (nodeID: string) => {
    setData(data.filter((el) => el.id !== nodeID));
  };

  return { data, registerData, toggleComplete, removeData };
};
