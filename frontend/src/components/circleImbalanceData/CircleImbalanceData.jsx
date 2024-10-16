import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMemberForecast } from "../../apiService";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTooltip,
} from "victory";
import "./CircleImbalanceData.css";

async function calculateDayAheadImbalance(circle) {
  const inflows = [];
  const outflows = [];
  const imbalances = [];

  for (const member of circle.members) {
    const memberData = await getMemberForecast(member.id);
    const data = member.type === "Consumer" ? outflows : inflows;

    for (const forecast of memberData.forecast) {
      const hourlyForecast = data.find((e) => e.date === forecast.date);
      if (hourlyForecast) {
        hourlyForecast.value += forecast.value;
      } else {
        data.push(forecast);
      }
    }
  }

  for (const inflow of inflows) {
    const hourlyInflow = imbalances.find((e) => e.date === inflow.date);
    if (hourlyInflow) {
      hourlyInflow.value += inflow.value;
    } else {
      imbalances.push(inflow);
    }
  }
  for (const outflow of outflows) {
    const hourlyOutflow = imbalances.find((e) => e.date === outflow.date);
    if (hourlyOutflow) {
      hourlyOutflow.value -= outflow.value;
    } else {
      imbalances.push(outflow);
    }
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
          <VictoryChart height={600} width={1200}>
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
            <VictoryLine
              data={dayAheadImbalance}
              x="date"
              y="value"
              labels={({ datum }) => datum.date}
              style={{
                data: { stroke: "#82ca9d" },
              }}
              labelComponent={<VictoryTooltip />}
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
