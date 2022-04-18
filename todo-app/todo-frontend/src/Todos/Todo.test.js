import { render } from "@testing-library/react";
import Todo from "./Todo";

describe("Todo component", () => {
  it("should render text", () => {
    const { container } = render(
      <Todo todo={{ done: false, text: "test text" }} />
    );

    expect(container).toHaveTextContent("test text");
  });
});
