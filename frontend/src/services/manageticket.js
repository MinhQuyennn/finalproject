import axios from "axios";

export const ListAllTicket = async () => {
  return await axios.get(`http://localhost:8081/api/listofticket`);
};
