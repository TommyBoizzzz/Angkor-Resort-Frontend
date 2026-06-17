import BASE_URL from "../../config/global";

const API_URL = `${BASE_URL}/bookings`;

// =========================
// GET ALL BOOKINGS
// =========================
export const getAllBookings = async () => {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch bookings");
    }

    return await res.json();
  } catch (error) {
    console.error("getAllBookings ERROR:", error);
    return [];
  }
};

// =========================
// CREATE BOOKING
// =========================
export const createBooking = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Create booking failed");
    }

    return result;
  } catch (error) {
    console.error("createBooking ERROR:", error);
    throw error;
  }
};

// =========================
// UPDATE BOOKING
// =========================
export const updateBooking = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Update failed");
    }

    return result;
  } catch (error) {
    console.error("updateBooking ERROR:", error);
    throw error;
  }
};

// =========================
// DELETE BOOKING
// =========================
export const deleteBooking = async (id) => {
  try {
    const res = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Delete failed");
    }

    return result;
  } catch (error) {
    console.error("deleteBooking ERROR:", error);
    return { success: false };
  }
};

// =========================
// CANCEL BOOKING
// =========================
export const cancelBooking = async (id) => {
  try {
    const res = await fetch(`${API_URL}/cancel/${id}`, {
      method: "PUT",
    });

    const data = await res.json();

    return data.success === true;
  } catch (error) {
    console.error("cancelBooking ERROR:", error);
    return false;
  }
};