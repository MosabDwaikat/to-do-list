class Task {
  constructor(title, description, priority) {
    this.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.title = title;
    this.description = description;
    this.priority = priority;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask() {
    const title = document.getElementById("task-title");
    const description = document.getElementById("task-description");
    const priority = document.getElementById("task-priority");
    if (!title.value) {
      title.classList.add("input-error");
    } else {
      title.classList.remove("input-error");
    }
    if (!description.value) {
      description.classList.add("input-error");
    } else {
      description.classList.remove("input-error");
    }
    if (!title.value || !description.value) return;
    this.tasks.push(new Task(title.value, description.value, priority.value));
    title.value = "";
    description.value = "";
    priority.value = "low";
    this.changeTaskPriorityIndicator();
    console.log(this.tasks);
  }
  changeTaskPriorityIndicator() {
    const selectedPriority = document.getElementById("task-priority").value;
    const background = document.getElementById("task-priority-panel");
    switch (selectedPriority) {
      case "low":
        background.style.backgroundColor = "lightgreen";
        break;
      case "medium":
        background.style.backgroundColor = "yellow";
        break;
      case "high":
        background.style.backgroundColor = "darkred";
        break;
      default:
        background.style.backgroundColor = "white";
        break;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const taskList = new TaskList();
  const btn = document.getElementById("add-task-btn");
  btn.addEventListener("click", taskList.addTask.bind(taskList));
  const prioritySelect = document.getElementById("task-priority");
  prioritySelect.addEventListener(
    "change",
    taskList.changeTaskPriorityIndicator.bind(taskList)
  );
});
