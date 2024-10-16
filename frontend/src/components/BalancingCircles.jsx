// src/components/BalancingCircles.jsx
import { useEffect, useState } from "react";
import { getBalancingCircles } from "../apiService";
import MemberDrillDown from "./MemberDrillDown";

const BalancingCircles = () => {
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState(null);

  useEffect(() => {
    getBalancingCircles()
      .then((data) => setCircles(data))
      .catch((error) =>
        console.error("Error fetching balancing circles:", error)
      );
  }, []);

  const handleCircleClick = (circle) => {
    setSelectedCircle(circle);
  };

  return (
    <div>
      <h1>Balancing Circles</h1>
      <ul>
        {circles.map((circle) => (
          <li key={circle.id} onClick={() => handleCircleClick(circle)}>
            {circle.name}
          </li>
        ))}
      </ul>
      {selectedCircle && <MemberDrillDown circle={selectedCircle} />}
    </div>
  );
};

export default BalancingCircles;
