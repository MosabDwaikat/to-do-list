class Task {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}

class TaskList {
  idcount = 0;
  constructor() {
    this.tasks = [];
  }
  addTask() {
    let title = document.getElementById("task-title");
    let description = document.getElementById("task-description");
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
    let id = this.idcount++;
    this.tasks.push(new Task(id, title.value, description.value));
    title.value = "";
    description.value = "";
    console.log(this.tasks);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let taskList = new TaskList();
  let btn = document.getElementById("add-task-btn");
  btn.addEventListener("click", taskList.addTask.bind(taskList));
});
