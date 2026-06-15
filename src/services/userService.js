import axios from "axios";
import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/users`;

const UserService = {
  // GET ALL USERS
  getAllUsers: () => {
    return axios.get(API_URL);
  },

  // GET USER BY ID
  getUserById: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  // CREATE USER
  createUser: (user) => {
    return axios.post(API_URL, user);
  },

  // UPDATE USER (PROFILE SAVE)
  updateUser: (id, user) => {
    return axios.put(`${API_URL}/${id}`, user);
  },

  // DELETE USER
  deleteUser: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },
};

export default UserService;