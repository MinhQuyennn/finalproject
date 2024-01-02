import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/";

export const getBookingProcessById = async (booking_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}bookingprocess/${booking_id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
