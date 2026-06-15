import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

import { getAvailableRooms } from "../../services/roomService";

import "./css/roomdetail.css";

export default function RoomDetails() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);
    const [roomCount, setRoomCount] = useState(1);
    const [available, setAvailable] = useState(0);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        window.scrollTo(0, 0);
        loadAvailableRooms();
    }, [roomId]);

    const loadAvailableRooms = async () => {
        const roomTypeMap = {
            standard: "STANDARD",
            deluxe: "DELUXE",
            suite: "SUITE",
        };

        const roomType = roomTypeMap[roomId];

        if (!roomType) {
            console.warn("Invalid roomId:", roomId);
            setAvailable(0);
            return;
        }

        const count = await getAvailableRooms(roomType);
        setAvailable(count);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    // =========================
    // STATIC ROOM DATA
    // =========================
    const rooms = {
        standard: {
            title: "STANDARD ROOM",
            price: "$80 / Night",
            images: [
                "/images/room-standard.png",
                "/images/room-standard.png",
                "/images/room-standard.png",
            ],
            description:
                "A cozy retreat with warm wood tones and a peaceful garden view.",
            guests: "2 Guests",
            beds: "1 Queen Bed",
            size: "30 m²",
            view: "Garden View",
        },

        deluxe: {
            title: "DELUXE ROOM",
            price: "$120 / Night",
            images: [
                "/images/room-deluxe.png",
                "/images/room-deluxe.png",
                "/images/room-deluxe.png",
            ],
            description:
                "Spacious comfort with a king bed, modern design, and premium amenities.",
            guests: "2 Guests",
            beds: "1 King Bed",
            size: "45 m²",
            view: "Pool View",
        },

        suite: {
            title: "SUITE",
            price: "$180 / Night",
            images: [
                "/images/room-suite.png",
                "/images/room-suite.png",
                "/images/room-suite.png",
            ],
            description:
                "Premium accommodation featuring luxury furnishings and a private terrace.",
            guests: "3 Guests",
            beds: "1 King Bed",
            size: "55 m²",
            view: "Resort View",
        },
    };

    const room = rooms[roomId];

    if (!room) {
        return (
            <>
                <SiteHeader
                    user={user}
                    showProfile={showProfile}
                    setShowProfile={setShowProfile}
                    onLogin={() => navigate("/login")}
                    onRegister={() => navigate("/register")}
                    onLogout={handleLogout}
                />

                <main className="pt-24 flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl font-bold">Room Not Found</h1>
                    <p className="mt-3 text-gray-500">
                        The room you are looking for does not exist.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 book-btn"
                    >
                        Back Home
                    </button>
                </main>

                <SiteFooter />
            </>
        );
    }

    const isFull = available <= 0;
    const isButtonDisabled = isFull || available <= 0;

    // =========================
    // INPUT HELPERS
    // =========================
    const getCheckIn = () =>
        document.querySelectorAll(".booking-input")[0]?.value;

    const getCheckOut = () =>
        document.querySelectorAll(".booking-input")[1]?.value;

    const getNights = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        const diff = end.getTime() - start.getTime();
        const nights = diff / (1000 * 60 * 60 * 24);

        return nights > 0 ? nights : 0;
    };

    // =========================
    // BOOK NOW
    // =========================
    const handleBookNow = async () => {
        const currentUser = JSON.parse(localStorage.getItem("user") || "null");

        const checkInDate = getCheckIn();
        const checkOutDate = getCheckOut();

        if (!currentUser) {
            alert("Please login first.");
            navigate("/login");
            return;
        }

        if (!checkInDate || !checkOutDate) {
            alert("⚠️ Please select check-in and check-out dates.");
            return;
        }

        const nights = getNights(checkInDate, checkOutDate);

        if (nights <= 0) {
            alert("⚠️ Check-out must be after check-in date.");
            return;
        }

        if (isFull) {
            alert("❌ This room is fully booked.");
            return;
        }

        if (roomCount < 1) {
            alert("❌ Please select at least 1 room.");
            return;
        }

        if (roomCount > available) {
            alert(`❌ Only ${available} room(s) available.`);
            return;
        }

        try {
            const basePrice = Number(room.price.replace(/[^0-9]/g, ""));
            const totalPrice = basePrice * nights * roomCount;

            const res = await fetch("http://localhost:8080/api/bookings/reserve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    roomType: roomId.toUpperCase(),
                    userId: currentUser.id,
                    roomCount,
                    checkInDate,
                    checkOutDate,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Reservation failed");
                return;
            }

            navigate("/payment", {
                state: {
                    bookingId: data.bookingId,
                    rooms: data.rooms,
                    roomName: room.title,
                    roomPrice: basePrice,
                    roomCount,
                    nights,
                    checkInDate,
                    checkOutDate,
                    totalPrice,
                },
            });

        } catch (err) {
            console.error(err);
            alert("Server error while booking");
        }
    };

    // =========================
    // UI
    // =========================
    return (
        <>
            <SiteHeader
                user={user}
                showProfile={showProfile}
                setShowProfile={setShowProfile}
                onLogin={() => navigate("/login")}
                onRegister={() => navigate("/register")}
                onLogout={handleLogout}
            />

            <main className="pt-24">
                <div className="room-page">
                    <div className="room-container">

                        <div className="grid lg:grid-cols-3 gap-10">

                            {/* LEFT */}
                            <div className="lg:col-span-2">

                                <div className="image-gallery-scroll">
                                    <div className="scroll-container">
                                        {room.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt="room"
                                                className="scroll-image"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <h1 className="room-title">{room.title}</h1>

                                <p className="room-description">
                                    {room.description}
                                </p>

                                <div className="room-details-section">
                                    <h3 className="section-title">Details</h3>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <p className="detail-item">{room.guests}</p>
                                        <p className="detail-item">{room.beds}</p>
                                        <p className="detail-item">{room.size}</p>
                                        <p className="detail-item">{room.view}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className="booking-card">

                                    <h2 className="booking-title">
                                        Book Your Stay
                                    </h2>

                                    <form className="space-y-5">

                                        <input type="date" className="booking-input" />
                                        <input type="date" className="booking-input" />

                                        <div>
                                            <label className="booking-label">
                                                Number of Rooms
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                max={available}
                                                value={roomCount}
                                                onChange={(e) =>
                                                    setRoomCount(Number(e.target.value))
                                                }
                                                className="booking-input"
                                                disabled={isFull}
                                            />

                                            <p style={{ fontSize: "12px", color: "gray" }}>
                                                Available: {available}
                                            </p>

                                            {isFull && (
                                                <p style={{ color: "red", fontSize: "12px" }}>
                                                    ⚠️ This room is fully booked
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleBookNow}
                                            className={`book-btn ${isButtonDisabled ? "disabled-btn" : ""}`}
                                            disabled={isButtonDisabled}
                                        >
                                            {isFull ? "Fully Booked" : "Book Now"}
                                        </button>

                                    </form>

                                    <div className="price-box">
                                        {room.price}
                                    </div>

                                    <Link to="/" className="back-link">
                                        Back to Home
                                    </Link>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </>
    );
}