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
      low: "bg-color-green",
      medium: "bg-color-yellow",
      high: "bg-color-red",
    };

    this.tasks.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.id = task.id;
      if (task.completed) taskItem.classList.add("completed");
      taskItem.classList.add(priorityColors[task.priority] || "bg-color-white");

      const taskBody = document.createElement("div");
      taskBody.classList.add("task-body");

      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info");

      const taskTitle = document.createElement("h3");
      taskTitle.textContent = task.title;
      taskInfo.appendChild(taskTitle);

      const taskDescription = document.createElement("p");
      taskDescription.textContent = task.description;
      taskInfo.appendChild(taskDescription);

      taskBody.appendChild(taskInfo);

      const taskBtns = document.createElement("div");
      taskBtns.classList.add("task-btns");

      const completeButton = document.createElement("button");
      completeButton.classList.add("task-item-complete-btn");
      completeButton.innerHTML = task.completed
        ? incompleteIcon()
        : completeIcon();
      completeButton.addEventListener("click", () =>
        this.completeTask(task.id)
      );

      const editButton = document.createElement("button");
      editButton.classList.add("task-item-edit-btn");
      editButton.innerHTML = editIcon();

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("task-item-delete-btn");
      deleteButton.innerHTML = deleteIcon();
      deleteButton.addEventListener("click", () => this.deleteTask(task.id));

      taskBtns.appendChild(completeButton);
      taskBtns.appendChild(editButton);
      taskBtns.appendChild(deleteButton);

      taskItem.appendChild(taskBody);
      taskItem.appendChild(taskBtns);

      tasksContainer.appendChild(taskItem);
    });
  }

  changeTaskPriorityIndicator() {
    const selectedPriority = document.getElementById("task-priority").value;
    const background = document.getElementById("task-priority-panel");
    const priorityColors = {
      low: "bg-color-green",
      medium: "bg-color-yellow",
      high: "bg-color-red",
    };
    const currentColor = Array.from(background.classList).find((className) =>
      className.startsWith("bg-color-")
    );
    background.classList.replace(
      currentColor,
      priorityColors[selectedPriority] || "bg-color-white"
    );
  }
  completeTask(id) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.displayTasks();
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
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
