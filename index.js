class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

class TaskList {
  constructor() {
    this.tasks = [];
  }

  addTask() {
    const title = document.getElementById("task-title");
    const description = document.getElementById("task-description");
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
    this.tasks.push(
      new Task(`${Date.now()}-${Math.floor(Math.random() * 10000)}`, title.value, description.value)
    );
    title.value = "";
    description.value = "";
    console.log(this.tasks);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const taskList = new TaskList();
  const btn = document.getElementById("add-task-btn");
  btn.addEventListener("click", taskList.addTask.bind(taskList));
});
