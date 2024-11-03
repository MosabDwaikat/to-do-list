import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TaskType from "../../types/TaskType";
import { RootState } from "..";

interface TasksState {
  tasks: TaskType[];
}
const storageTasks = localStorage.getItem("tasks");
const parsedTasks = storageTasks ? JSON.parse(storageTasks) : [];

const initialState: TasksState = {
  tasks: parsedTasks
};

const tasksSlice = createSlice({
  name: "tasksList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    editTask: (state, action: PayloadAction<TaskType>) => {
      state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    completeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    }
  }
});
export const tasksList = (state: RootState) => state.tasksList.tasks;
export const { addTask, editTask, deleteTask, completeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
