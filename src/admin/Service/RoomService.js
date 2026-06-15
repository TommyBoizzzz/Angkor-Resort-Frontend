import BASE_URL from "../../config/global";

const API = `${BASE_URL}/rooms`;

export const getAllRooms = async () => {
  const res = await fetch(API);
  return res.json();
};

export const createRoom = async (data) => {
  const res = await fetch(`${API}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateRoom = async (id, data) => {
  const res = await fetch(`${API}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteRoom = async (id) => {
  const res = await fetch(`${API}/delete/${id}`, {
    method: "DELETE",
  });
  return res.json();
};