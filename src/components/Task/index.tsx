import React, { ChangeEvent, useState } from "react";
import { completeIcon, deleteIcon, editIcon, incompleteIcon } from "../Icons";
import TaskType from "../../types/TaskType";
import PriorityColorClass from "../../utils/PriorityColorClass";
import "./index.scss";
import PriorityType from "../../types/PriorityType";
import { completeTask, deleteTask, editTask } from "../../app/tasks/tasksSlice";
import { AppDispatch } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const dispatch: AppDispatch = useAppDispatch();

  const cancelEditTask = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const saveEditTask = () => {
    dispatch(editTask(editedTask));
    setIsEditing(false);
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  return (
    <div className={"task-item " + PriorityColorClass(task.priority) + (task.completed ? " completed" : "")}>
      <div className="task-body">
        <div className="task-info">
          {isEditing ? (
            <input className="task-title" value={editedTask.title} name="title" onChange={handleValueChange} />
          ) : (
            <h3>{task.title}</h3>
          )}
          {isEditing ? (
            <input
              className="task-description"
              value={editedTask.description}
              name="description"
              onChange={handleValueChange}
            />
          ) : (
            <p>{task.description}</p>
          )}
        </div>
      </div>
      <div className="task-btns">
        {isEditing ? (
          <select
            className="edit-task-priority"
            value={editedTask.priority}
            name="priority"
            onChange={handleValueChange}
          >
            <option value={PriorityType.low}>Low</option>
            <option value={PriorityType.medium}>Medium</option>
            <option value={PriorityType.high}>High</option>
          </select>
        ) : (
          <button className="task-item-complete-btn" onClick={() => dispatch(completeTask(task.id))}>
            {task.completed ? incompleteIcon() : completeIcon()}
          </button>
        )}
        {isEditing ? (
          <button className="task-item-complete-btn" name="saveEdit" onClick={saveEditTask}>
            {completeIcon()}
          </button>
        ) : (
          <button className="task-item-edit-btn" onClick={handleEditTask}>
            {editIcon()}
          </button>
        )}
        {isEditing ? (
          <button className="task-item-delete-btn" name="cancelEdit" onClick={cancelEditTask}>
            {incompleteIcon()}
          </button>
        ) : (
          <button className="task-item-delete-btn" onClick={() => dispatch(deleteTask(task.id))}>
            {deleteIcon()}
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
