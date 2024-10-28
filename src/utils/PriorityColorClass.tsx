import PriorityType from "../types/PriorityType";

const PriorityColorClass = (priority: PriorityType) => {
  switch (priority) {
    case PriorityType.high:
      return "bg-color-red";
    case PriorityType.medium:
      return "bg-color-yellow";
    case PriorityType.low:
      return "bg-color-green";
    default:
      return "";
  }
};

export default PriorityColorClass;
