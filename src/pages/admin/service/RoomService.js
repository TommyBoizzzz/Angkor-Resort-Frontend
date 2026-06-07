import axios from "axios";

const API_URL = "http://localhost:8080/api/rooms";

const RoomService = {
  getAllRooms: () => axios.get(API_URL),

  getRoomById: (id) =>
    axios.get(`${API_URL}/${id}`),

  createRoom: (room) =>
    axios.post(API_URL, room),

  deleteRoom: (id) =>
    axios.delete(`${API_URL}/${id}`)
};

export default RoomService;