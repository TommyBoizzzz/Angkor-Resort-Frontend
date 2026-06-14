import { useState } from "react";
import "./css/profile.css";
import ProfileCard from "./ProfileCard";

function ProfileSetting() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState({
    fullname:
      storedUser.fullname ||
      storedUser.email?.split("@")[0] ||
      "Guest User",
    email: storedUser.email || "",
    sex: storedUser.sex || "Male",
  });

  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
  };

  return (
    <div className="profile-page">
      {/* --- Added Back Button --- */}
      <button 
        className="back-button" 
        onClick={() => window.history.back()}
        title="Go Back"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Home
      </button>

      <ProfileCard
        user={user}
        editing={editing}
        setUser={setUser}
        setEditing={setEditing}
        handleSave={handleSave}
      />
    </div>
  );
}

export default ProfileSetting;