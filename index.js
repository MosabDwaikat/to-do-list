import { deleteIcon, completeIcon, editIcon, incompleteIcon } from "./icons.js";
var PriorityType;
(function (PriorityType) {
    PriorityType["low"] = "low";
    PriorityType["medium"] = "medium";
    PriorityType["high"] = "high";
})(PriorityType || (PriorityType = {}));
var CSSClassName;
(function (CSSClassName) {
    CSSClassName["InputError"] = "input-error";
    CSSClassName["TaskItem"] = "task-item";
    CSSClassName["Completed"] = "completed";
    CSSClassName["TaskBody"] = "task-body";
    CSSClassName["TaskInfo"] = "task-info";
    CSSClassName["TaskBtns"] = "task-btns";
    CSSClassName["CompleteButton"] = "task-item-complete-btn";
    CSSClassName["EditButton"] = "task-item-edit-btn";
    CSSClassName["DeleteButton"] = "task-item-delete-btn";
    CSSClassName["TaskTitle"] = "task-title";
    CSSClassName["TaskDescription"] = "task-description";
    CSSClassName["EditTaskPriority"] = "edit-task-priority";
})(CSSClassName || (CSSClassName = {}));
const priorityColorClass = {
    low: "bg-color-green",
    medium: "bg-color-yellow",
    high: "bg-color-red",
};
class Task {
    constructor(title, description, priority) {
        this.id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        this.title = title;
        this.priority = priority;
        this.description = description;
        this.completed = false;
    }
}
class TaskList {
    constructor() {
        this.tasks = [];
        const loadedTasks = this.loadTasksFromLocalStorage();
        if (loadedTasks) {
            this.tasks = loadedTasks;
        }
        else {
            this.tasks = [];
        }
    }
    saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    loadTasksFromLocalStorage() {
        const tasksJson = localStorage.getItem("tasks");
        if (tasksJson) {
            return JSON.parse(tasksJson);
        }
        return null;
    }
    addTask() {
        const title = document.getElementById("task-title");
        const description = document.getElementById("task-description");
        const priority = document.getElementById("task-priority");
        if (title) {
            if (!title.value) {
                title.classList.add(CSSClassName.InputError);
            }
            else {
                title.classList.remove(CSSClassName.InputError);
            }
        }
        if (description) {
            if (!description.value) {
                description.classList.add(CSSClassName.InputError);
            }
            else {
                description.classList.remove(CSSClassName.InputError);
            }
        }
        if (!(title === null || title === void 0 ? void 0 : title.value) ||
            !(description === null || description === void 0 ? void 0 : description.value) ||
            !(priority === null || priority === void 0 ? void 0 : priority.value) ||
            !this.isValidPriority(priority.value)) {
            return;
        }
        this.tasks.push(new Task(title.value, description.value, priority.value));
        title.value = "";
        description.value = "";
        priority.value = PriorityType.low;
        this.changeTaskPriorityIndicator();
        this.displayTasks();
    }
    isValidPriority(value) {
        return (value === PriorityType.low ||
            value === PriorityType.medium ||
            value === PriorityType.high);
    }
    changeTaskPriorityIndicator() {
        const prioritySelect = document.getElementById("task-priority");
        if (!prioritySelect)
            return;
        const priority = prioritySelect.value;
        const background = document.getElementById("task-priority-panel");
        if (!background)
            return;
        const currentColor = Array.from(background.classList).find((className) => className.startsWith("bg-color-"));
        if (currentColor) {
            background.classList.replace(currentColor, priorityColorClass[priority]);
        }
        else {
            background.classList.add(priorityColorClass[priority]);
        }
    }
    displayTasks() {
        const tasksList = document.getElementById("tasks-list");
        const filter = document.getElementById("filter");
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
    renderTask(task) {
        const tasksList = document.getElementById("tasks-list");
        if (!tasksList)
            return;
        let taskItem = document.getElementById(task.id);
        if (!taskItem) {
            taskItem = document.createElement("div");
            taskItem.classList.add(CSSClassName.TaskItem);
            taskItem.id = task.id;
        }
        taskItem.innerHTML = "";
        const currentColor = Array.from(taskItem.classList).find((className) => className.startsWith("bg-color-"));
        if (currentColor) {
            taskItem.classList.replace(currentColor, priorityColorClass[task.priority]);
        }
        else {
            taskItem.classList.add(priorityColorClass[task.priority]);
        }
        if (task.completed)
            taskItem.classList.add(CSSClassName.Completed);
        const taskBody = document.createElement("div");
        taskBody.classList.add(CSSClassName.TaskBody);
        const taskInfo = document.createElement("div");
        taskInfo.classList.add(CSSClassName.TaskInfo);
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;
        taskInfo.appendChild(taskTitle);
        const taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;
        taskInfo.appendChild(taskDescription);
        taskBody.appendChild(taskInfo);
        const taskBtns = document.createElement("div");
        taskBtns.classList.add(CSSClassName.TaskBtns);
        const completeButton = document.createElement("button");
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
        let inserted = false;
        for (let child of tasksList.children) {
            if (child.id > taskItem.id) {
                tasksList.insertBefore(taskItem, child);
                inserted = true;
                break;
            }
        }
        if (!inserted)
            tasksList.appendChild(taskItem);
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.displayTasks();
    }
    completeTask(id) {
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
        this.displayTasks();
    }
    editTask(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (!task)
            return;
        const taskItem = document.getElementById(id);
        if (!taskItem)
            return;
        taskItem.innerHTML = "";
        const taskBody = document.createElement("div");
        taskBody.classList.add(CSSClassName.TaskBody);
        const taskInfo = document.createElement("div");
        taskInfo.classList.add(CSSClassName.TaskInfo);
        const editTaskTitle = document.createElement("input");
        editTaskTitle.classList.add(CSSClassName.TaskTitle);
        editTaskTitle.value = task.title;
        taskInfo.appendChild(editTaskTitle);
        const editTaskDescription = document.createElement("input");
        editTaskDescription.classList.add(CSSClassName.TaskDescription);
        editTaskDescription.value = task.description;
        taskInfo.appendChild(editTaskDescription);
        taskBody.appendChild(taskInfo);
        const taskBtns = document.createElement("div");
        taskBtns.classList.add(CSSClassName.TaskBtns);
        const editPriority = document.createElement("select");
        editPriority.classList.add(CSSClassName.EditTaskPriority);
        const priorities = [
            PriorityType.low,
            PriorityType.medium,
            PriorityType.high,
        ];
        priorities.forEach((priority) => {
            const option = document.createElement("option");
            option.value = priority;
            option.text = priority.charAt(0).toUpperCase() + priority.slice(1);
            if (task.priority === priority)
                option.selected = true;
            editPriority.appendChild(option);
        });
        taskBtns.appendChild(editPriority);
        const saveEditBtn = document.createElement("button");
        saveEditBtn.classList.add(CSSClassName.CompleteButton);
        saveEditBtn.innerHTML = completeIcon();
        saveEditBtn.addEventListener("click", () => {
            task.title = editTaskTitle.value;
            task.description = editTaskDescription.value;
            task.priority = editPriority.value;
            this.renderTask(task);
            this.saveTasksToLocalStorage();
        });
        const cancelEditBtn = document.createElement("button");
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
    const addTaskBtn = document.getElementById("add-task-btn");
    if (!addTaskBtn)
        return;
    addTaskBtn.addEventListener("click", () => taskList.addTask());
    const prioritySelect = document.getElementById("task-priority");
    if (!prioritySelect)
        return;
    prioritySelect.addEventListener("change", () => taskList.changeTaskPriorityIndicator());
    const filterSelect = document.getElementById("filter");
    if (!filterSelect)
        return;
    filterSelect.addEventListener("change", () => {
        taskList.displayTasks();
    });
});
