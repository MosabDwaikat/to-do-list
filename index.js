import { deleteIcon, completeIcon, editIcon, incompleteIcon } from "./icons.js";
class Task {
  constructor(title, description, priority, completed = false) {
    this.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
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
    this.displayTasks();
  }
  displayTasks() {
    const tasksContainer = document.getElementById("tasks-list");
    tasksContainer.innerHTML = "";
    const priorityColors = {
      low: "lightgreen",
      medium: "yellow",
      high: "darkred",
    };

    this.tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.id = task.id;
      if (task.completed) taskItem.classList.add("completed");
      taskItem.style.backgroundColor = priorityColors[task.priority] || "white";

      taskItem.innerHTML = `
      <div class="task-body">
      <div class="task-info">
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      </div>
      </div>
      <div class="task-btns">
      <button class="task-item-complete-btn" id="task-item-complete-btn">${
        task.completed ? incompleteIcon() : completeIcon()
      }</button>
      <button class="task-item-edit-btn">${editIcon()}</button>
      <button class="task-item-delete-btn">${deleteIcon()}</button>
      </div>
    `;

      tasksContainer.appendChild(taskItem);
    });
    this.attachCompleteTaskListeners();
  }
  attachCompleteTaskListeners() {
    const completeButtons = document.querySelectorAll(
      ".task-item-complete-btn"
    );
    completeButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.completeTask(e));
    });
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
  completeTask(event) {
    const taskItem = event.target.closest("button").parentElement.parentElement;
    const taskIndex = this.tasks.findIndex((task) => task.id === taskItem.id);
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.displayTasks();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const taskList = new TaskList();
  const addTaskBtn = document.getElementById("add-task-btn");
  addTaskBtn.addEventListener("click", () => taskList.addTask());
  const prioritySelect = document.getElementById("task-priority");
  prioritySelect.addEventListener("change", () =>
    taskList.changeTaskPriorityIndicator()
  );
});
