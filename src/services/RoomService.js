import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/rooms`;

// =========================
// GET AVAILABLE ROOMS BY TYPE
// =========================
export const getAvailableRooms = async (roomType) => {
    try {
        const response = await fetch(
            `${API_URL}/available/${roomType}`
        );

        const data = await response.text();

        return parseInt(data || "0");
    } catch (error) {
        console.error("getAvailableRooms ERROR:", error);
        return 0;
    }
};

// =========================
// GET ALL ROOMS
// =========================
export const getAllRooms = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("getAllRooms ERROR:", error);
        return [];
    }
};

// =========================
// GET ROOM BY ID
// =========================
export const getRoomById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error("getRoomById ERROR:", error);
        return null;
    }
};