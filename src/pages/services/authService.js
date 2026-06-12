//for server connection on local
// const API_URL = "http://localhost:8080/api/auth";

//for server connection production
const API_URL = "https://angkor-resort-backend-production.up.railway.app/api/auth";

// REGISTER
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
};

// LOGIN
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    return await response.json();
};