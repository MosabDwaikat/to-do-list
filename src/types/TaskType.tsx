import PriorityType from "./PriorityType";

type TaskType = {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  completed: boolean;
};
export default TaskType;
