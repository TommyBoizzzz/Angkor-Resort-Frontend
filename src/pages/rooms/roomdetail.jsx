import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

import "./css/roomdetail.css";

export default function RoomDetails() {

    const { roomId } = useParams();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const [roomCount, setRoomCount] = useState(1);

    const [room, setRoom] = useState(null);
    const [bookedCount, setBookedCount] = useState(0);

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const user = JSON.parse(localStorage.getItem("user") || "null");

    // =========================
    // LOAD ROOM FROM DB
    // =========================
    useEffect(() => {
        fetchRoom();
    }, [roomId]);

    const fetchRoom = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/rooms/${roomId}`
            );
            setRoom(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // =========================
    // LOAD BOOKED COUNT
    // =========================
    useEffect(() => {
        if (room) loadBooked();
    }, [room]);

    const loadBooked = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/bookings/room-type/count`,
                {
                    params: {
                        roomType: room.roomType
                    }
                }
            );

            setBookedCount(res.data.booked);

        } catch (err) {
            console.log(err);
        }
    };

    const available =
        (room?.totalRooms || 0) - bookedCount;

    const isFull = available <= 0;

    // =========================
    // BOOK NOW
    // =========================
    const handleBookNow = async () => {

        if (!user) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (!checkIn || !checkOut) {
            alert("Please select dates");
            return;
        }

        if (roomCount > available) {
            alert(`Only ${available} rooms available`);
            return;
        }

        try {

            const res = await axios.post(
                `http://localhost:8080/api/bookings?userId=${user.id}&roomId=${room.id}`,
                {
                    checkInDate: checkIn,
                    checkOutDate: checkOut
                }
            );

            if (res.data.success) {

                navigate("/payment", {
                    state: {
                        bookingId: res.data.bookingId,
                        totalPrice: res.data.totalPrice,
                        roomName: room.roomType
                    }
                });

            } else {
                alert(res.data.message);
            }

        } catch (err) {
            console.log(err);
            alert("Booking failed");
        }
    };

    // =========================
    // LOADING
    // =========================
    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <SiteHeader
                user={user}
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                onLogin={() => navigate("/login")}
                onRegister={() => navigate("/register")}
                onLogout={() => {
                    localStorage.removeItem("user");
                    navigate("/");
                }}
            />

            <main className="pt-24">
                <div className="room-page">

                    <h1>{room.roomType}</h1>

                    <p>{room.description}</p>

                    <h3>
                        Available: {available}
                    </h3>

                    {/* CHECK IN */}
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) =>
                            setCheckIn(e.target.value)
                        }
                        className="booking-input"
                    />

                    {/* CHECK OUT */}
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) =>
                            setCheckOut(e.target.value)
                        }
                        className="booking-input"
                    />

                    {/* ROOM COUNT */}
                    <input
                        type="number"
                        min="1"
                        max={available}
                        value={roomCount}
                        onChange={(e) =>
                            setRoomCount(
                                Number(e.target.value)
                            )
                        }
                        className="booking-input"
                    />

                    <button
                        onClick={handleBookNow}
                        disabled={isFull}
                        className="book-btn"
                        style={{
                            opacity: isFull ? 0.5 : 1
                        }}
                    >
                        {isFull
                            ? "Fully Booked"
                            : "Book Now"}
                    </button>

                    <div className="price-box">
                        ${room.price} / Night
                    </div>

                    <Link to="/" className="back-link">
                        Back to Home
                    </Link>

                </div>
            </main>

            <SiteFooter />
        </>
    );
}