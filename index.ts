import { deleteIcon, completeIcon, editIcon, incompleteIcon } from "./icons.js";
enum PriorityType {
  low = "low",
  medium = "medium",
  high = "high",
}

enum CSSClassName {
  InputError = "input-error",
  TaskItem = "task-item",
  Completed = "completed",
  TaskBody = "task-body",
  TaskInfo = "task-info",
  TaskBtns = "task-btns",
  CompleteButton = "task-item-complete-btn",
  EditButton = "task-item-edit-btn",
  DeleteButton = "task-item-delete-btn",
  TaskTitle = "task-title",
  TaskDescription = "task-description",
  EditTaskPriority = "edit-task-priority",
}

const priorityColorClass: Record<PriorityType, string> = {
  low: "bg-color-green",
  medium: "bg-color-yellow",
  high: "bg-color-red",
};

class Task {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  completed: boolean;
  constructor(title: string, description: string, priority: PriorityType) {
    this.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.title = title;
    this.priority = priority;
    this.description = description;
    this.completed = false;
  }
}

class TaskList {
  tasks: Task[] = [];
  constructor() {
    const loadedTasks = this.loadTasksFromLocalStorage();
    if (loadedTasks) {
      this.tasks = loadedTasks;
    } else {
      this.tasks = [];
    }
  }
  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
  loadTasksFromLocalStorage(): Task[] | null {
    const tasksJson = localStorage.getItem("tasks");
    if (tasksJson) {
      return JSON.parse(tasksJson) as Task[];
    }
    return null;
  }
  addTask() {
    const title = document.getElementById(
      "task-title"
    ) as HTMLInputElement | null;
    const description = document.getElementById(
      "task-description"
    ) as HTMLInputElement | null;
    const priority = document.getElementById(
      "task-priority"
    ) as HTMLSelectElement | null;
    if (title) {
      if (!title.value) {
        title.classList.add(CSSClassName.InputError);
      } else {
        title.classList.remove(CSSClassName.InputError);
      }
    }
    if (description) {
      if (!description.value) {
        description.classList.add(CSSClassName.InputError);
      } else {
        description.classList.remove(CSSClassName.InputError);
      }
    }
    if (
      !title?.value ||
      !description?.value ||
      !priority?.value ||
      !this.isValidPriority(priority.value)
    ) {
      return;
    }
    this.tasks.push(new Task(title.value, description.value, priority.value));
    title.value = "";
    description.value = "";
    priority.value = PriorityType.low;

    this.changeTaskPriorityIndicator();
    this.displayTasks();
  }
  isValidPriority(value: string): value is PriorityType {
    return (
      value === PriorityType.low ||
      value === PriorityType.medium ||
      value === PriorityType.high
    );
  }
  changeTaskPriorityIndicator(): void {
    const prioritySelect = document.getElementById(
      "task-priority"
    ) as HTMLSelectElement | null;
    if (!prioritySelect) return;
    const priority = prioritySelect.value as PriorityType;
    const background = document.getElementById(
      "task-priority-panel"
    ) as HTMLDivElement | null;
    if (!background) return;

    const currentColor = Array.from(background.classList).find((className) =>
      className.startsWith("bg-color-")
    );
    if (currentColor) {
      background.classList.replace(currentColor, priorityColorClass[priority]);
    } else {
      background.classList.add(priorityColorClass[priority]);
    }
  }
  displayTasks(): void {
    const tasksList = document.getElementById("tasks-list");
    const filter = document.getElementById("filter") as HTMLSelectElement;
    const filterValue = filter.value;
    if (tasksList) {
      tasksList.innerHTML = "";
      this.tasks.forEach((task) => {
        if (filterValue === "all" || filterValue === task.priority)
          this.renderTask(task);
      });
    }
    this.saveTasksToLocalStorage();
  }
  renderTask(task: Task): void {
    const tasksList = document.getElementById(
      "tasks-list"
    ) as HTMLDivElement | null;
    if (!tasksList) return;
    let taskItem = document.getElementById(task.id) as HTMLDivElement | null;
    if (!taskItem) {
      taskItem = document.createElement("div");
      taskItem.classList.add(CSSClassName.TaskItem);
      taskItem.id = task.id;
    }
    taskItem.innerHTML = "";
    const currentColor = Array.from(taskItem.classList).find((className) =>
      className.startsWith("bg-color-")
    );
    if (currentColor) {
      taskItem.classList.replace(
        currentColor,
        priorityColorClass[task.priority]
      );
    } else {
      taskItem.classList.add(priorityColorClass[task.priority]);
    }
    if (task.completed) taskItem.classList.add(CSSClassName.Completed);

    const taskBody: HTMLDivElement = document.createElement("div");
    taskBody.classList.add(CSSClassName.TaskBody);

    const taskInfo: HTMLDivElement = document.createElement("div");
    taskInfo.classList.add(CSSClassName.TaskInfo);

    const taskTitle: HTMLHeadingElement = document.createElement("h3");
    taskTitle.textContent = task.title;
    taskInfo.appendChild(taskTitle);

    const taskDescription: HTMLParagraphElement = document.createElement("p");
    taskDescription.textContent = task.description;
    taskInfo.appendChild(taskDescription);

    taskBody.appendChild(taskInfo);

    const taskBtns: HTMLDivElement = document.createElement("div");
    taskBtns.classList.add(CSSClassName.TaskBtns);

    const completeButton: HTMLButtonElement = document.createElement("button");
    completeButton.classList.add(CSSClassName.CompleteButton);
    completeButton.innerHTML = task.completed
      ? incompleteIcon()
      : completeIcon();
    completeButton.addEventListener("click", () => this.completeTask(task.id));

    const editButton = document.createElement("button");
    editButton.classList.add(CSSClassName.EditButton);
    editButton.innerHTML = editIcon();
    editButton.addEventListener("click", () => this.editTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add(CSSClassName.DeleteButton);
    deleteButton.innerHTML = deleteIcon();
    deleteButton.addEventListener("click", () => this.deleteTask(task.id));

    taskBtns.appendChild(completeButton);
    taskBtns.appendChild(editButton);
    taskBtns.appendChild(deleteButton);

    taskItem.appendChild(taskBody);
    taskItem.appendChild(taskBtns);

    let inserted: boolean = false;
    for (let child of tasksList.children) {
      if (child.id > taskItem.id) {
        tasksList.insertBefore(taskItem, child);
        inserted = true;
        break;
      }
    }
    if (!inserted) tasksList.appendChild(taskItem);
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.displayTasks();
  }
  completeTask(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    this.displayTasks();
  }
  editTask(id: string): void {
    const task: Task | undefined = this.tasks.find((task) => task.id === id);
    if (!task) return;
    const taskItem = document.getElementById(id) as HTMLDivElement | null;
    if (!taskItem) return;
    taskItem.innerHTML = "";

    const taskBody: HTMLDivElement = document.createElement("div");
    taskBody.classList.add(CSSClassName.TaskBody);

    const taskInfo: HTMLDivElement = document.createElement("div");
    taskInfo.classList.add(CSSClassName.TaskInfo);

    const editTaskTitle: HTMLInputElement = document.createElement("input");
    editTaskTitle.classList.add(CSSClassName.TaskTitle);
    editTaskTitle.value = task.title;
    taskInfo.appendChild(editTaskTitle);

    const editTaskDescription: HTMLInputElement =
      document.createElement("input");
    editTaskDescription.classList.add(CSSClassName.TaskDescription);
    editTaskDescription.value = task.description;
    taskInfo.appendChild(editTaskDescription);

    taskBody.appendChild(taskInfo);

    const taskBtns: HTMLDivElement = document.createElement("div");
    taskBtns.classList.add(CSSClassName.TaskBtns);

    const editPriority: HTMLSelectElement = document.createElement("select");
    editPriority.classList.add(CSSClassName.EditTaskPriority);

    Object.values(PriorityType).forEach((priority) => {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = priority;
      option.text = priority.charAt(0).toUpperCase() + priority.slice(1);
      if (task.priority === priority) option.selected = true;
      editPriority.appendChild(option);
    });
    taskBtns.appendChild(editPriority);

    const saveEditBtn: HTMLButtonElement = document.createElement("button");
    saveEditBtn.classList.add(CSSClassName.CompleteButton);
    saveEditBtn.innerHTML = completeIcon();
    saveEditBtn.addEventListener("click", () => {
      task.title = editTaskTitle.value;
      task.description = editTaskDescription.value;
      task.priority = editPriority.value as PriorityType;
      this.renderTask(task);
      this.saveTasksToLocalStorage();
    });

    const cancelEditBtn: HTMLButtonElement = document.createElement("button");
    cancelEditBtn.classList.add(CSSClassName.DeleteButton);
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
  taskList.displayTasks();
  const addTaskBtn = document.getElementById(
    "add-task-btn"
  ) as HTMLButtonElement | null;
  if (!addTaskBtn) return;
  addTaskBtn.addEventListener("click", () => taskList.addTask());
  const prioritySelect = document.getElementById(
    "task-priority"
  ) as HTMLSelectElement | null;
  if (!prioritySelect) return;
  prioritySelect.addEventListener("change", () =>
    taskList.changeTaskPriorityIndicator()
  );
  const filterSelect = document.getElementById(
    "filter"
  ) as HTMLSelectElement | null;
  if (!filterSelect) return;
  filterSelect.addEventListener("change", () => {
    taskList.displayTasks();
  });
});
