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
    this.tasks = this.loadTasksFromLocalStorage() || [];
    this.displayTasks();
  }
  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  loadTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks"));
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
    const filter = document.getElementById("filter").value;
    this.tasks.forEach((task) => {
      if (filter === "all" || task.priority === filter) this.renderTask(task);
    });
    this.saveTasksToLocalStorage();
  }

  renderTask(task) {
    const tasksContainer = document.getElementById("tasks-list");
    const priorityColors = {
      low: "bg-color-green",
      medium: "bg-color-yellow",
      high: "bg-color-red",
    };
    let taskItem = document.getElementById(task.id);
    if (!taskItem) {
      taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.id = task.id;
    }
    taskItem.innerHTML = "";
    const currentColor = Array.from(taskItem.classList).find((className) =>
      className.startsWith("bg-color-")
    );
    if (currentColor) {
      taskItem.classList.replace(
        currentColor,
        priorityColors[task.priority] || "bg-color-white"
      );
    } else {
      taskItem.classList.add(priorityColors[task.priority] || "bg-color-white");
    }
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
    completeButton.addEventListener("click", () => this.completeTask(task.id));

    const editButton = document.createElement("button");
    editButton.classList.add("task-item-edit-btn");
    editButton.innerHTML = editIcon();
    editButton.addEventListener("click", () => this.editTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("task-item-delete-btn");
    deleteButton.innerHTML = deleteIcon();
    deleteButton.addEventListener("click", () => this.deleteTask(task.id));

    taskBtns.appendChild(completeButton);
    taskBtns.appendChild(editButton);
    taskBtns.appendChild(deleteButton);

    taskItem.appendChild(taskBody);
    taskItem.appendChild(taskBtns);

    let inserted = false;
    for (let child of tasksContainer.children) {
      if (child.id > taskItem.id) {
        console.log("Match found!", child);
        tasksContainer.insertBefore(taskItem, child);
        inserted = true;
        break;
      }
    }
    if (!inserted) tasksContainer.appendChild(taskItem);
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
  editTask(id) {
    const task = this.tasks.find((task) => task.id === id);
    const taskItem = document.getElementById(id);
    taskItem.innerHTML = "";

    const taskBody = document.createElement("div");
    taskBody.classList.add("task-body");

    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");

    const editTaskTitle = document.createElement("input");
    editTaskTitle.classList.add("task-title");
    editTaskTitle.value = task.title;
    taskInfo.appendChild(editTaskTitle);

    const editTaskDescription = document.createElement("input");
    editTaskDescription.classList.add("task-description");
    editTaskDescription.value = task.description;
    taskInfo.appendChild(editTaskDescription);

    taskBody.appendChild(taskInfo);

    const taskBtns = document.createElement("div");
    taskBtns.classList.add("task-btns");

    const editPriority = document.createElement("select");
    editPriority.classList.add("edit-task-priority");
    const priorities = ["low", "medium", "high"];
    priorities.forEach((priority) => {
      const option = document.createElement("option");
      option.value = priority;
      option.text = priority.charAt(0).toUpperCase() + priority.slice(1);
      if (task.priority === priority) option.selected = true;
      editPriority.appendChild(option);
    });
    taskBtns.appendChild(editPriority);

    const saveEditBtn = document.createElement("button");
    saveEditBtn.classList.add("task-item-complete-btn");
    saveEditBtn.innerHTML = completeIcon();
    saveEditBtn.addEventListener("click", () => {
      task.title = editTaskTitle.value;
      task.description = editTaskDescription.value;
      task.priority = editPriority.value;
      this.renderTask(task);
      this.saveTasksToLocalStorage();
    });

    const cancelEditBtn = document.createElement("button");
    cancelEditBtn.classList.add("task-item-delete-btn");
    cancelEditBtn.innerHTML = incompleteIcon();
    cancelEditBtn.addEventListener("click", () => this.displayTasks());

    taskBtns.appendChild(saveEditBtn);
    taskBtns.appendChild(cancelEditBtn);

    taskItem.appendChild(taskBody);
    taskItem.appendChild(taskBtns);
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
  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", () => {
    taskList.displayTasks();
  });
});
