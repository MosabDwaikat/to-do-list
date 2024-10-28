import React, { useState } from 'react';
import './index.css';
import PriorityType from '../../types/PriorityType';
import TaskType from '../../types/TaskType';
import PriorityColorClass from '../../utils/PriorityColorClass';

interface AddTaskProps {
  addTask: (task: TaskType) => void;
}

const AddTask = ({ addTask }: AddTaskProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(PriorityType.low);
  const [submitted, setSubmitted] = useState(false);

  const handleAddTask = () => {
    setSubmitted(true);
    if (!title || !description) {
      return;
    }
    const task: TaskType = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title: title,
      description: description,
      priority: priority,
      completed: false,
    };
    addTask(task);
    setTitle('');
    setDescription('');
    setPriority(PriorityType.low);
    setSubmitted(false);
  };

  return (
    <div className="add-task-panel">
      <button
        className="add-task-btn"
        id="add-task-btn"
        onClick={handleAddTask}
      >
        Add
      </button>
      <div className="add-task-info-panel">
        <div className="add-task-info-header-panel">
          <input
            type="text"
            className={
              'task-title' + (submitted && !title ? ' input-error' : '')
            }
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <div
            className={'task-priority-panel ' + PriorityColorClass(priority)}
            id="task-priority-panel"
          >
            <label htmlFor="task-priority" className="task-priority-label">
              Priority:
            </label>
            <select
              id="task-priority"
              className="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityType)}
            >
              <option value={PriorityType.low}>Low</option>
              <option value={PriorityType.medium}>Medium</option>
              <option value={PriorityType.high}>High</option>
            </select>
          </div>
        </div>
        <input
          type="text"
          className={
            'task-description' +
            (submitted && !description ? ' input-error' : '')
          }
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>
    </div>
  );
};

export default AddTask;
