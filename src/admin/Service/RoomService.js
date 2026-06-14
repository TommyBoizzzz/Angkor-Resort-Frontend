import BASE_URL from "../../config/global";

const API_URL = `${BASE_URL}/rooms`;

// =========================
// GET ALL ROOMS
// =========================
export const getAllRooms = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Get rooms request failed");
  }

  return response.json();
};

// =========================
// GET ROOM BY ID
// =========================
export const getRoomById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Get room request failed");
  }

  return response.json();
};

// =========================
// CREATE ROOM
// =========================
export const createRoom = async (roomData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    throw new Error("Create room request failed");
  }

  return response.json();
};

// =========================
// UPDATE ROOM
// =========================
export const updateRoom = async (id, roomData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
  });

  if (!response.ok) {
    throw new Error("Update room request failed");
  }

  return response.json();
};

// =========================
// DELETE ROOM
// =========================
export const deleteRoom = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete room request failed");
  }

  return response.json();
};