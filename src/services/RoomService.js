const BASE_URL = "http://localhost:8080/api/rooms";

// =========================
// GET AVAILABLE ROOMS BY TYPE
// =========================
export const getAvailableRooms = async (roomType) => {
    try {
        const response = await fetch(
            `${BASE_URL}/available/${roomType}`
        );

        const data = await response.text();

        return parseInt(data || "0");
    } catch (error) {
        console.error("getAvailableRooms ERROR:", error);
        return 0;
    }
};

// =========================
// OPTIONAL: GET ALL ROOMS
// =========================
export const getAllRooms = async () => {
    try {
        const response = await fetch(BASE_URL);
        return await response.json();
    } catch (error) {
        console.error("getAllRooms ERROR:", error);
        return [];
    }
};

// =========================
// OPTIONAL: GET ROOM BY ID
// =========================
export const getRoomById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error("getRoomById ERROR:", error);
        return null;
    }
};