import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { ChevronRight } from "lucide-react";

function App() {
  interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

  type FilterType = "all" | "active" | "completed";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTask, setInputTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isTasksVisible, setIsTasksVisible] = useState(true);

  const addTask = () => {
    if (inputTask.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputTask.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputTask("");
    }
  };

  const toggleTask = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const handleChevron = (): void => {
    setIsTasksVisible(!isTasksVisible);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const clearCompleted = (): void => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const tasksLeft: number =
    tasks.length - tasks.filter((task) => task.completed).length;

  const getFilteredTasks = (): Task[] => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="todo">
      <p className="todo__title">todos</p>
      <div className="todo__main">
        <div className="todo__input">
          <button className="todo__chevron" onClick={handleChevron}>
            <ChevronRight
              className={`text-[#afafaf] relative left-2 top-1 transition-transform ${
                tasks.length > 0 && isTasksVisible ? "rotate-90" : ""
              }`}
              width={48}
              height={48}
            />
          </button>
          <input
            value={inputTask}
            onChange={(e) => setInputTask(e.target.value)}
            onKeyDown={handleEnter}
            className="todo__input--field"
            type="text"
            name="task"
            id="task"
            placeholder="What need to be done?"
          />
          <button onClick={addTask}></button>
        </div>
        {isTasksVisible && (
          <>
            <div className="todo__tasks">
              {tasks.length === 0 ? (
                <p className="todo__task">Пока нет задач. Добавьте первую!</p>
              ) : filteredTasks.length === 0 ? (
                <p className="todo__task">
                  No tasks in category "
                  {filter === "active" ? "Active" : "Completed"}"
                </p>
              ) : (
                filteredTasks.map((task: Task) => (
                  <Todo key={task.id} task={task} onToggle={toggleTask} />
                ))
              )}
            </div>
            {tasks.length > 0 && (
              <div className="todo__footer flex flex-row justify-between items-center m-4 px-2">
                <div className="text-xl min-w-[156px] text-center">
                  {tasksLeft} items left
                </div>
                <div className="w-fit">
                  <div className="text-xl">
                    <button
                      onClick={() => setFilter("all")}
                      className={`px-3 py-1  ${
                        filter === "all" ? " border-[1px] rounded-sm" : ""
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter("active")}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        filter === "active" ? " border-[1px] rounded-sm" : ""
                      }`}
                    >
                      Active
                    </button>
                    <button
                      onClick={() => setFilter("completed")}
                      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                        filter === "completed" ? " border-[1px] rounded-sm" : ""
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
                <div className="text-xl text-right">
                  <button onClick={clearCompleted}>Clear completed</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="todo__decoration--upper"></div>
      <div className="todo__decoration--lower"></div>
    </div>
  );
}

export default App;
