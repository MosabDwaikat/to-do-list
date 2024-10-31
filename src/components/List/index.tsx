import React from "react";
import "./index.scss";
import Task from "../Task";
import PriorityType from "../../types/PriorityType";
import { useAppSelector } from "../../app/hooks";

const List = () => {
  const filter = useAppSelector((state) => state.filter);
  const tasks = useAppSelector((state) => state.tasksList.tasks);

  return (
    <div className="list" id="tasks-list">
      {tasks.map((task) => {
        if (filter.priority === PriorityType.all || filter.priority === task.priority)
          return <Task key={task.id} task={task} />;
        return null;
      })}
    </div>
  );
};

export default List;
