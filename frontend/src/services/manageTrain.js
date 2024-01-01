import axios from "axios";

export const ListOfTrain = async () => {
  return await axios.get("http://localhost:8081/api/listoftrain");
};

export const SearchTrain = async (train_name) => {
  return await axios.get(`http://localhost:8081/api/searchtrain/${train_name}`);
};

export const ViewTrain = async (train_id) => {
  return await axios.get(`http://localhost:8081/api/viewtrain/${train_id}`);
};
