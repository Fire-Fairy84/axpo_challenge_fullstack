import axios from "axios";

const API_BASE_URL = "http://localhost:5295/api/v1/balancing";

export const getBalancingCircles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balancing circles:", error);
    throw error;
  }
};

export const getMemberForecast = async (memberId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/member/${memberId}/forecast`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching member forecast:", error);
    throw error;
  }
};
