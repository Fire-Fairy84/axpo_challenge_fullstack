import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMemberForecast } from "../../apiService";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip } from "victory";
import "./CircleImbalanceData.css";

async function calculateDayAheadImbalance(circle) {
  const imbalances = [];

  for (const member of circle.members) {
    const memberData = await getMemberForecast(member.id);
    const isConsumer = member.type === "Consumer";

    memberData.forecast.forEach((forecast) => {
      let imbalance = imbalances.find((e) => e.date === forecast.date);
      if (!imbalance) {
        imbalance = { date: forecast.date, value: 0 };
        imbalances.push(imbalance);
      }

      if (isConsumer) {
        imbalance.value -= forecast.value;
      } else {
        imbalance.value += forecast.value;
      }
    });
  }

  return imbalances;
}

const CircleImbalanceData = ({ circle }) => {
  const [dayAheadImbalance, setDayAheadImbalance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembersForecast = async () => {
      setLoading(true);
      try {
        const dayAheadImbalance = await calculateDayAheadImbalance(circle);
        setDayAheadImbalance(dayAheadImbalance);
      } catch (error) {
        console.error("Error fetching member forecast:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembersForecast();
  }, [circle]);

  return (
    <div className="member-drilldown-container">
      <h2>Drill-down for {circle.name}</h2>
      {loading ? (
        <p>Loading member data...</p>
      ) : dayAheadImbalance.length > 0 ? (
        <div className="chart-container">
          <VictoryChart
            height={2800}
            width={8000}
            padding={{ top: 50, bottom: 80, left: 200, right: 200 }}
            style={{
              parent: { backgroundColor: "#f5f5f5" },
            }}
          >
            <VictoryAxis
              label="Date"
              style={{
                tickLabels: { fill: "#ffffff" },
                axis: { stroke: "#ffffff" },
                axisLabel: { fill: "#ffffff", padding: 30 },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Imbalance"
              style={{
                tickLabels: { fill: "#ffffff" },
                axis: { stroke: "#ffffff" },
                axisLabel: { fill: "#ffffff", padding: 40 },
              }}
            />
            <VictoryBar
              data={dayAheadImbalance}
              x="date"
              y="value"
              labels={({ datum }) => `Imbalance: ${datum.value}`}
              barWidth={54}
              style={{
                data: { fill: "#82ca9d" },
              }}
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ stroke: "#333", fill: "#f5f5f5" }}
                  style={{ fontSize: 120, fill: "#333" }}
                />
              }
            />
          </VictoryChart>
        </div>
      ) : (
        <p>No valid member data available.</p>
      )}
    </div>
  );
};

CircleImbalanceData.propTypes = {
  circle: PropTypes.shape({
    name: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default CircleImbalanceData;
