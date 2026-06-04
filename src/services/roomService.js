import axios from "axios";

const API_URL = "http://localhost:8080/api/rooms";

export const getRooms = () => {
  return axios.get(API_URL);
};

export const getRoomById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};