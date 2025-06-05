import "@testing-library/jest-dom";

jest.mock("lucide-react", () => ({
  ChevronRight: () => <div data-testid="chevron-right" />,
  Check: () => <div data-testid="check" />,
}));
