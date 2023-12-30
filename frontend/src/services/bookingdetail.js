import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/";

export const getBookingProcessById = async (bookingId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}bookingprocess/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
