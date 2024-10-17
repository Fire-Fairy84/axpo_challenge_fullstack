import axios from "axios";

const API_BASE_URL = "http://localhost:5295/api";

export const getBalancingCircles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/balancing`);
    return response.data;
  } catch (error) {
    console.error("Error fetching balancing circles:", error);
    throw error;
  }
};

export const getMemberForecast = async (memberId) => {
  try {
    console.log("Requesting forecast for member ID:", memberId);
    const response = await axios.get(
      `${API_BASE_URL}/v1/balancing/member/${memberId}/forecast`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching member forecast:", error);
    throw error;
  }
};
