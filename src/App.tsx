import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/List";
import AddTask from "./components/AddTask";
import TaskType from "./types/TaskType";
import PriorityType from "./types/PriorityType";

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storageTasks = localStorage.getItem("tasks");
    return storageTasks ? JSON.parse(storageTasks) : [];
  });
  const [filter, setFilter] = useState(PriorityType.all);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: TaskType) => {
    setTasks([...tasks, task]);
    console.log(tasks);
  };

  return (
    <div className="main">
      <Header setFilter={setFilter} />
      <List tasks={tasks} setTasks={setTasks} filter={filter} />
      <AddTask addTask={addTask} />
    </div>
  );
}

export default App;
