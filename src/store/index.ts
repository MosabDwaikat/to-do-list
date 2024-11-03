import { configureStore, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import FilterReducer from "./filter/filterSlice";
import TasksReducer, { addTask, completeTask, deleteTask, editTask } from "./tasks/tasksSlice";

const updateStorageMiddleware = createListenerMiddleware();
updateStorageMiddleware.startListening({
  matcher: isAnyOf(addTask, completeTask, deleteTask, editTask),
  effect: (_, listener_API) => {
    const state = listener_API.getState() as RootState;
    const tasks = state.tasksList.tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

const store = configureStore({
  reducer: {
    filter: FilterReducer,
    tasksList: TasksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(updateStorageMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
