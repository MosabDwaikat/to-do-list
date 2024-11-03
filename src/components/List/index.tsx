import React from "react";
import "./index.scss";
import Task from "../Task";
import PriorityType from "../../types/PriorityType";
import { useAppSelector } from "../../store/hooks";
import { selectedPriority } from "../../store/filter/filterSlice";
import { tasksList } from "../../store/tasks/tasksSlice";

const List = () => {
  const priority = useAppSelector(selectedPriority);
  const tasks = useAppSelector(tasksList);

  return (
    <div className="list" id="tasks-list">
      {tasks.map((task) => {
        if (priority === PriorityType.all || priority === task.priority) return <Task key={task.id} task={task} />;
        return null;
      })}
    </div>
  );
};

export default List;
