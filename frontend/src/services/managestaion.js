import axios from "axios";

export const ListOfStation = async () => {
  return await axios.get(`http://localhost:8081/api/listofstation`);
};

export const addStation = async (stationData) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/addnewstation`,
      stationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding new station:", error);
    throw error;
  }
};
