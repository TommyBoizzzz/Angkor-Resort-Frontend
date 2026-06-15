// service/RoomService.js
import BASE_URL from "../../config/global";

const API = `${BASE_URL}/rooms`;

// =========================
// GET ALL ROOMS
// =========================
export const getAllRooms = async () => {
  try {
    const res = await fetch(API);

    if (!res.ok) throw new Error("Failed to fetch rooms");

    return await res.json();
  } catch (error) {
    console.error("getAllRooms error:", error);
    return [];
  }
};

// =========================
// CREATE ROOM
// =========================
export const createRoom = async (data) => {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomNumber: data.roomNumber,
        roomType: data.roomType,
        price: Number(data.price),
        status: data.status || "AVAILABLE",
      }),
    });

    return await res.json();
  } catch (error) {
    console.error("createRoom error:", error);
    return { success: false, message: "Create failed" };
  }
};

// =========================
// UPDATE ROOM (FIXED)
// =========================
export const updateRoom = async (id, data) => {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomNumber: data.roomNumber,
        roomType: data.roomType,
        price: Number(data.price),
        status: data.status,
      }),
    });

    return await res.json();
  } catch (error) {
    console.error("updateRoom error:", error);
    return { success: false, message: "Update failed" };
  }
};

// =========================
// DELETE ROOM
// =========================
export const deleteRoom = async (id) => {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error) {
    console.error("deleteRoom error:", error);
    return { success: false, message: "Delete failed" };
  }
};