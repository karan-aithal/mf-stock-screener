import "../../../frontend/src/App.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// export const fetchRollingReturn = async (fundCode: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/api/rolling-return`, {
//       params: { fund_code: fundCode },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching rolling return:', error);
//     throw error;
//   }
// };

export const fetchRollingReturn = async (fundCode: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/calculate`,
      { fund_code: fundCode },
      {
        headers: {
          "Content-Type": "application/json"}
      });
      return response;
  } catch (error) {
    console.error("Error fetching rolling return:", error);
    throw error;
  }
};
