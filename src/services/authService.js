import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/auth`;

// =========================
// REGISTER
// =========================
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error("Register request failed");
    }

    return response.json();
};

// =========================
// LOGIN
// =========================
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error("Login request failed");
    }

    return response.json();
};