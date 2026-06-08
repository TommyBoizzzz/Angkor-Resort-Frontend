import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { SiteHeader } from "../../components/site-header";
import { Hero } from "../../components/hero";
import { About } from "../../components/about";
import { Rooms } from "../../components/rooms";
import { Facilities } from "../../components/facilities";
import { SiteFooter } from "../../components/site-footer";

function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleBooking = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/booking");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader
        user={user}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
        onLogout={handleLogout}
      />

      <Hero onBooking={handleBooking} />
      <About />
      <Rooms onBooking={handleBooking} />
      <Facilities />
      <SiteFooter />
    </main>
  );
}

export default Dashboard;