import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/bookings`;

// =========================
// CREATE BOOKING
// =========================
export const createBooking = async (bookingData) => {
    try {
        const response = await fetch(`${API_URL}/reserve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Booking failed");
        }

        return data;
    } catch (error) {
        console.error("createBooking ERROR:", error);
        throw error;
    }
};

// =========================
// GET BOOKING BY ID
// =========================
export const getBookingById = async (bookingId) => {
    try {
        const response = await fetch(`${API_URL}/${bookingId}`);
        return await response.json();
    } catch (error) {
        console.error("getBookingById ERROR:", error);
        return null;
    }
};

// =========================
// GET BOOKINGS BY USER
// =========================
export const getBookingsByUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        return await response.json();
    } catch (error) {
        console.error("getBookingsByUser ERROR:", error);
        return [];
    }
};

// =========================
// CANCEL BOOKING
// =========================
export const cancelBooking = async (bookingId) => {
    try {
        const response = await fetch(`${API_URL}/${bookingId}`, {
            method: "DELETE",
        });

        return response.ok;
    } catch (error) {
        console.error("cancelBooking ERROR:", error);
        return false;
    }
};