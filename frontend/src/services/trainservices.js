import axios from "axios";

export const ListAllTrain = async (
  departure_station,
  arrival_station,
  departure_date
) => {
  const encodedDeparture = encodeURIComponent(departure_station);
  const encodedArrival = encodeURIComponent(arrival_station);

  try {
    const response = await axios.get(
      `http://localhost:8081/api/train/${encodedDeparture}/${encodedArrival}/${departure_date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
