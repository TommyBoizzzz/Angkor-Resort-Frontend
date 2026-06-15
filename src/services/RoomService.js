import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/rooms`;

export const getAvailableRooms = async (roomType) => {
    try {
        const response = await fetch(`${API_URL}/available/${roomType}`);
        const data = await response.text();
        return parseInt(data || "0");
    } catch (error) {
        console.error("getAvailableRooms ERROR:", error);
        return 0;
    }
};

export const getAllRooms = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error("getAllRooms ERROR:", error);
        return [];
    }
};

export const getRoomById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error("getRoomById ERROR:", error);
        return null;
    }
};