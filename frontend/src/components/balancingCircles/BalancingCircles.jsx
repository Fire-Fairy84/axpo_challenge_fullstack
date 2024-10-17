// src/components/BalancingCircles.jsx
import { useEffect, useState } from "react";
import { getBalancingCircles } from "../../apiService";
import CircleImbalanceData from "../circleImbalanceData/CircleImbalanceData";
import "./BalancingCircles.css";

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
    <div className="balancing-circles-container">
      <h1 className="title">Balancing Circles</h1>
      <ul className="circles-list">
        {circles.map((circle) => (
          <li
            key={circle.id}
            className="circle-item"
            onClick={() => handleCircleClick(circle)}
          >
            {circle.name}
          </li>
        ))}
      </ul>
      {selectedCircle && <CircleImbalanceData circle={selectedCircle} />}
    </div>
  );
};

export default BalancingCircles;
