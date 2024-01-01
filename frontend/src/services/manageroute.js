import axios from "axios";

export const ListOfRoutes = async () => {
  return await axios.get(`http://localhost:8081/api/listofroute`);
};

export const ViewRouteById = async (route_id) => {
  return await axios.get(`http://localhost:8081/api/viewroute/${route_id}`);
};

export const AddNewRoute = async (routeData) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/insertnewroute`,
      routeData,
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
