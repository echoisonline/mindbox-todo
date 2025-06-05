import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  test("renders initial UI correctly", async () => {
    render(<App />);
    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What need to be done?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Пока нет задач. Добавьте первую!")
    ).toBeInTheDocument();
    // Проверка кнопки + (чтобы не отображалась при пустои поле ввода)
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  test("shows add button when input is not empty", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What need to be done?");

    // ввод текста
    await userEvent.type(input, "New Task");
    expect(screen.getByText("+")).toBeInTheDocument();

    // Очистка ввода
    await userEvent.clear(input);
    expect(screen.queryByText("+")).not.toBeInTheDocument();

    // Проверка вводом пробелов
    await userEvent.type(input, "   ");
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  test("adds a new task when Enter is pressed or button is clicked", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What need to be done?");

    // Добавление задачи при помощи Enter
    await userEvent.type(input, "New Task");
    expect(screen.getByText("+")).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.queryByText("+")).not.toBeInTheDocument();

    // Добавление задачи при помощи кнопки +
    await userEvent.type(input, "Another Task");
    const addButton = screen.getByText("+");
    await userEvent.click(addButton);
    expect(screen.getByText("Another Task")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  test("does not add empty task", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What need to be done?");
    await userEvent.type(input, "   ");
    await userEvent.keyboard("{Enter}");
    expect(
      screen.getByText("Пока нет задач. Добавьте первую!")
    ).toBeInTheDocument();
    expect(screen.queryByText("+")).not.toBeInTheDocument();
  });

  test("toggles tasks visibility with chevron button", async () => {
    render(<App />);
    const chevronButton = screen.getByTestId("chevron-right");
    const input = screen.getByPlaceholderText("What need to be done?");

    await userEvent.type(input, "Visible Task");
    await userEvent.keyboard("{Enter}");
    expect(screen.getByText("Visible Task")).toBeInTheDocument();

    // Скрытие задач
    await userEvent.click(chevronButton);
    expect(screen.queryByText("Visible Task")).not.toBeInTheDocument();

    // Показ задач
    await userEvent.click(chevronButton);
    expect(screen.getByText("Visible Task")).toBeInTheDocument();
  });

  test("filters tasks by All, Active, and Completed", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What need to be done?");

    // добавить задачи
    await userEvent.type(input, "Task 1");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(input, "Task 2");
    await userEvent.keyboard("{Enter}");

    // Отметить первую задачу
    const task1Button = screen.getAllByRole("button")[1];
    await userEvent.click(task1Button);

    // Отметить все здачи
    const allButton = screen.getByText("All");
    await userEvent.click(allButton);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    // Отметить активные
    const activeButton = screen.getByText("Active");
    await userEvent.click(activeButton);
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();

    // Отметить выполненные
    const completedButton = screen.getByText("Completed");
    await userEvent.click(completedButton);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  test("clears completed tasks", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("What need to be done?");

    // Добавить задачи
    await userEvent.type(input, "Task 1");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(input, "Task 2");
    await userEvent.keyboard("{Enter}");

    // Отметить первую задачу
    const task1Button = screen.getAllByRole("button")[1];
    await userEvent.click(task1Button);

    // очистить выполненные
    const clearButton = screen.getByText("Clear completed");
    await userEvent.click(clearButton);

    // Проверка невыполненных задач
    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("1 items left")).toBeInTheDocument();
  });
});
