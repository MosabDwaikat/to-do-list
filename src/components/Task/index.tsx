import React, { ChangeEvent, useState } from 'react';
import { completeIcon, deleteIcon, editIcon, incompleteIcon } from '../Icons';
import TaskType from '../../types/TaskType';
import PriorityColorClass from '../../utils/PriorityColorClass';

interface TaskProps {
  task: TaskType;
  deleteTask: () => void;
  editTask: (updatedTask: TaskType) => void;
  completeTask: () => void;
}

const Task = ({ task, deleteTask, editTask, completeTask }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const cancelEditTask = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const saveEditTask = () => {
    editTask(editedTask);
    setIsEditing(false);
  };

  const handleEditTask = () => {
    setIsEditing(true);
  };

  const handleValueChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div
      className={
        'task-item ' +
        PriorityColorClass(task.priority) +
        (task.completed ? ' completed' : '')
      }
    >
      <div className="task-body">
        <div className="task-info">
          {isEditing ? (
            <input
              className="task-title"
              value={editedTask.title}
              name="title"
              onChange={handleValueChange}
            />
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          <button className="task-item-complete-btn" onClick={completeTask}>
            {task.completed ? incompleteIcon() : completeIcon()}
          </button>
        )}
        {isEditing ? (
          <button
            className="task-item-complete-btn"
            name="saveEdit"
            onClick={saveEditTask}
          >
            {completeIcon()}
          </button>
        ) : (
          <button className="task-item-edit-btn" onClick={handleEditTask}>
            {editIcon()}
          </button>
        )}
        {isEditing ? (
          <button
            className="task-item-delete-btn"
            name="cancelEdit"
            onClick={cancelEditTask}
          >
            {incompleteIcon()}
          </button>
        ) : (
          <button className="task-item-delete-btn" onClick={deleteTask}>
            {deleteIcon()}
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
