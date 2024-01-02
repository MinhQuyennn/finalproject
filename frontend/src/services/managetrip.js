import axios from "axios";

export const ListOfTrip = async () => {
  return await axios.get(`http://localhost:8081/api/listalltrip`);
};

export const ListOfTrain = async () => {
  return await axios.get(`http://localhost:8081/api/listoftrain`);
};

export const ListOfRoute = async () => {
  return await axios.get(`http://localhost:8081/api/listofroute`);
};

export const ListOfStation = async () => {
  return await axios.get(`http://localhost:8081/api/listofstation`);
};

export const AddNewTrip = async (tripData) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/addNewTrip`,
      tripData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new route:", error);
    throw error;
  }
};
