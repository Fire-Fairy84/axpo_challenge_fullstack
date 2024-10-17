import { render, screen } from "@testing-library/react";
import CircleImbalanceData from "./CircleImbalanceData";

describe("CircleImbalanceData Component", () => {
  const circleMock = {
    name: "Test Circle",
    members: [
      { id: 1, name: "Producer 1", type: "Producer" },
      { id: 2, name: "Consumer 1", type: "Consumer" },
    ],
  };

  it("renders without crashing and displays the drill-down heading", () => {
    render(<CircleImbalanceData circle={circleMock} />);
    expect(screen.getByText(/Drill-down for Test Circle/i)).toBeInTheDocument();
  });

  it("displays loading text initially", () => {
    render(<CircleImbalanceData circle={circleMock} />);
    expect(screen.getByText(/Loading member data/i)).toBeInTheDocument();
  });
});
