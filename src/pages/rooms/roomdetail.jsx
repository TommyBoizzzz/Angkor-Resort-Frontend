import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { SiteHeader } from "../../components/site-header";
import { SiteFooter } from "../../components/site-footer";

import "./css/roomdetail.css";

export default function RoomDetails() {
    const { roomId } = useParams();
    const navigate = useNavigate();

    const [showProfile, setShowProfile] = useState(false);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const rooms = {
        standard: {
            title: "STANDARD ROOM",
            price: "$80 / Night",
            image: "/images/room-standard.png",
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
            image: "/images/room-deluxe.png",
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
            image: "/images/room-suite.png",
            description:
                "Premium accommodation featuring luxury furnishings and a private terrace.",
            guests: "3 Guests",
            beds: "1 King Bed",
            size: "55 m²",
            view: "Resort View",
        },

        "family-suite": {
            title: "FAMILY SUITE",
            price: "$250 / Night",
            image: "/images/room-suite.png",
            description:
                "Perfect for families with two bedrooms, a living area, and beautiful garden views.",
            guests: "6 Guests",
            beds: "1 King Bed + 2 Single Beds",
            size: "65 m²",
            view: "Garden View",
        },
    };

    const room = rooms[roomId];

    // ❌ NOT FOUND PAGE (UNCHANGED STYLE)
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

                            {/* LEFT SIDE */}
                            <div className="lg:col-span-2">

                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="room-image"
                                />

                                <h1 className="room-title">
                                    {room.title}
                                </h1>

                                <p className="room-description">
                                    {room.description}
                                </p>

                                <div className="room-details-section">
                                    <h3 className="section-title">
                                        Details
                                    </h3>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <p className="detail-item">{room.guests}</p>
                                        <p className="detail-item">{room.beds}</p>
                                        <p className="detail-item">{room.size}</p>
                                        <p className="detail-item">{room.view}</p>
                                    </div>
                                </div>

                                <div className="amenities-section">
                                    <h3 className="section-title">
                                        Amenities
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <ul className="amenities-list">
                                            <li>• Air Conditioning</li>
                                            <li>• Free Wi-Fi</li>
                                            <li>• Smart TV</li>
                                            <li>• Mini Bar</li>
                                        </ul>

                                        <ul className="amenities-list">
                                            <li>• Swimming Pool Access</li>
                                            <li>• Complimentary Breakfast</li>
                                            <li>• Hair Dryer</li>
                                            <li>• Towels</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT SIDE */}
                            <div>
                                <div className="booking-card">

                                    <h2 className="booking-title">
                                        Book Your Stay
                                    </h2>

                                    <form className="space-y-5">

                                        <div>
                                            <label className="booking-label">
                                                Check In
                                            </label>

                                            <input
                                                type="date"
                                                className="booking-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="booking-label">
                                                Check Out
                                            </label>

                                            <input
                                                type="date"
                                                className="booking-input"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="number"
                                                placeholder="Adults"
                                                className="booking-input"
                                            />

                                            <input
                                                type="number"
                                                placeholder="Children"
                                                className="booking-input"
                                            />
                                        </div>

                                        {/* ✅ ONLY CHANGE IS HERE */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate("/payment", {
                                                    state: {
                                                        roomName: room.title,
                                                        roomPrice: Number(
                                                            room.price.replace(/[^0-9]/g, "")
                                                        ),
                                                    },
                                                })
                                            }
                                            className="book-btn"
                                        >
                                            Book Now
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