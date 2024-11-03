import React from "react";
import "./index.scss";
import Task from "../Task";
import PriorityType from "../../types/PriorityType";
import { useAppSelector } from "../../store/hooks";
import { selectPriority } from "../../store/filter/filterSlice";
import { tasksList } from "../../store/tasks/tasksSlice";

const List = () => {
  const filter = useAppSelector(selectPriority);
  const tasks = useAppSelector(tasksList);

  return (
    <div className="list" id="tasks-list">
      {tasks.map((task) => {
        if (filter === PriorityType.all || filter === task.priority) return <Task key={task.id} task={task} />;
        return null;
      })}
    </div>
  );
};

export default List;
