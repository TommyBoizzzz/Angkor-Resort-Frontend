import axios from "axios";
import BASE_URL from "../config/global";

const API_URL = `${BASE_URL}/payments`;

/**
 * Make payment for a booking
 */
export const makePayment = async (bookingId, paymentData) => {
    try {
        const res = await axios.post(
            `${API_URL}/${bookingId}`,
            paymentData
        );
        return res.data;
    } catch (err) {
        console.error("Payment error:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * Get payment by booking ID
 */
export const getPaymentByBooking = async (bookingId) => {
    try {
        const res = await axios.get(`${API_URL}/booking/${bookingId}`);
        return res.data;
    } catch (err) {
        console.error("Get payment error:", err.response?.data || err.message);
        throw err;
    }
};

/**
 * Get all payments (admin)
 */
export const getAllPayments = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (err) {
        console.error("Get all payments error:", err.response?.data || err.message);
        throw err;
    }
};