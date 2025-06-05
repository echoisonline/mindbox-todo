import { Check } from "lucide-react";
import React from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
}

const Todo: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div
      className={
        "border-b border-[#afafaf] flex align-middle p-3 gap-6 overflow break-words"
      }
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer relative left-2 top-1 flex-shrink-0 w-[48px] h-[48px] rounded-full border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? "border-[#afafaf] text-green"
            : "border-[#dadada] hover:border-[#afafaf]"
        }`}
      >
        {task.completed && (
          <Check
            className={`${task.completed ? " text-green-500" : ""}`}
            width={32}
            height={32}
          />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={`${
            task.completed ? "line-through text-[#dadada]" : "text-[#666666]"
          } text-[48px]`}
        >
          {task.text}
        </p>
      </div>
    </div>
  );
};

export default Todo;
