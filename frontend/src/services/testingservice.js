import axios from "axios";

export const ListAllCarriage = async (train_id) => {
  return await axios.get(`http://localhost:8081/api/carriage/${train_id}`);
};

export const ListAllSeatInOneCarriage = async (train_id, carriage_id) => {
  return await axios.get(
    `http://localhost:8081/api/carriage/${train_id}/${carriage_id}`
  );
};
