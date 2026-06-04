import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RoomCard from "../components/RoomCard";
import Footer from "../components/Footer";

import { getRooms } from "../services/roomService";

function Home() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const response = await getRooms();
    setRooms(response.data);
  };

  const filteredRooms = rooms.filter((room) =>
    room.roomNumber
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
      />

      <div className="grid">
        {filteredRooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;