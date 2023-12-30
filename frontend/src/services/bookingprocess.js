// carriageService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api/";

export const fetchCarriages = async (trainId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}carriage/${trainId}`);
    return response.data.carriages;
  } catch (error) {
    throw error;
  }
};

export const fetchSeats = async (trainId, carriageId, routeId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}carriage/${trainId}/${carriageId}/${routeId}`
    );
    return response.data.seats;
  } catch (error) {
    throw error;
  }
};

export const createBookingProcess = async (bookingData) => {
  try {
    // Convert relevant properties to numbers
    const modifiedBookingData = {
      ...bookingData,
      train_id: parseInt(bookingData.train_id, 10),
      route_id: parseInt(bookingData.route_id, 10),
      carriage_id: parseInt(bookingData.carriage_id, 10),
      seat_id: parseInt(bookingData.seat_id, 10),
    };

    const response = await axios.post(
      `${API_BASE_URL}bookingprocess`,
      modifiedBookingData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
