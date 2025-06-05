import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo Component", () => {
  const mockTask = { id: 1, text: "Test Task", completed: false };
  const mockOnToggle = jest.fn();

  test("renders task text correctly", () => {
    render(<Todo task={mockTask} onToggle={mockOnToggle} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Task")).not.toHaveClass("line-through");
    expect(screen.getByText("Test Task")).toHaveClass("text-[#666666]");
  });

  test("renders completed task with strikethrough and correct styles", () => {
    const completedTask = { id: 1, text: "Completed Task", completed: true };
    render(<Todo task={completedTask} onToggle={mockOnToggle} />);
    expect(screen.getByText("Completed Task")).toBeInTheDocument();
    expect(screen.getByText("Completed Task")).toHaveClass("line-through");
    expect(screen.getByText("Completed Task")).toHaveClass("text-[#dadada]");
  });

  test("calls onToggle when check button is clicked", () => {
    render(<Todo task={mockTask} onToggle={mockOnToggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockOnToggle).toHaveBeenCalledWith(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test("displays Check icon for completed task", () => {
    const completedTask = { id: 1, text: "Completed Task", completed: true };
    render(<Todo task={completedTask} onToggle={mockOnToggle} />);
    const checkIcon = screen.getByTestId("check"); // Ищем по data-testid
    expect(checkIcon).toBeInTheDocument();
  });

  test("does not display Check icon for incomplete task", () => {
    render(<Todo task={mockTask} onToggle={mockOnToggle} />);
    const checkIcon = screen.queryByTestId("check");
    expect(checkIcon).not.toBeInTheDocument();
  });
});
