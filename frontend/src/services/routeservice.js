import axios from "axios";

export const ListAllRoute = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/api/route`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const SearchDepartureAndArrival = async (
  departure_station,
  arrival_station,
  departure_date
) => {
  const encodedDeparture = encodeURIComponent(departure_station);
  const encodedArrival = encodeURIComponent(arrival_station);
  const encodedDepartureDate = encodeURIComponent(departure_date);

  try {
    const response = await axios.get(
      `http://localhost:8081/api/route/${encodedDeparture}/${encodedArrival}/${encodedDepartureDate}/${encodedDepartureDate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
