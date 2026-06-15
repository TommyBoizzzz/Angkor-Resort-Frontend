// service/RoomService.js
import BASE_URL from "../../config/global";

const API = `${BASE_URL}/rooms`;

// GET ALL
export const getAllRooms = async () => {
  const res = await fetch(API);
  return res.json();
};

// CREATE
export const createRoom = async (data) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      price: Number(data.price),
    }),
  });
  return res.json();
};

// UPDATE
export const updateRoom = async (id, data) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      price: Number(data.price),
    }),
  });
  return res.json();
};

// DELETE
export const deleteRoom = async (id) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};