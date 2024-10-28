import React from "react";
import "./index.scss";
import Task from "../Task";
import TaskType from "../../types/TaskType";
import PriorityType from "../../types/PriorityType";

interface ListProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  filter: PriorityType;
}
const List = ({ tasks, setTasks, filter }: ListProps) => {
  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const editTask = (updatedTask: TaskType) => {
    const newTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(newTasks);
  };

  const completeTask = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="list" id="tasks-list">
      {tasks.map((task) => {
        if (filter === PriorityType.all || filter === task.priority)
          return (
            <Task
              key={task.id}
              task={task}
              deleteTask={() => deleteTask(task.id)}
              editTask={editTask}
              completeTask={() => completeTask(task.id)}
            />
          );
        return null;
      })}
    </div>
  );
};

export default List;
