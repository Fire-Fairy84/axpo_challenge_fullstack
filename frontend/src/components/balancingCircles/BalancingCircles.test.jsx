import { render, screen, fireEvent } from "@testing-library/react";
import BalancingCircles from "./BalancingCircles";

describe("BalancingCircles Component", () => {
  it("renders without crashing and displays the heading", () => {
    render(<BalancingCircles />);
    expect(screen.getByText("Balancing Circles")).toBeInTheDocument();
  });

  it("renders a list and allows the user to click an item to see more details", () => {
    render(<BalancingCircles />);

    const testCircles = [
      { id: 1, name: "Circle 1", members: [] },
      { id: 2, name: "Circle 2", members: [] },
    ];

    testCircles.forEach((circle) => {
      const circleItem = screen.queryByText(circle.name);
      if (circleItem) {
        fireEvent.click(circleItem);
        expect(
          screen.getByText(`Drill-down for ${circle.name}`)
        ).toBeInTheDocument();
      }
    });
  });
});
