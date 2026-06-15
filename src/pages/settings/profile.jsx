import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import UserService from "../../services/userService";

function ProfileSetting() {
  // =========================
  // LOAD USER (SAFE INIT)
  // =========================
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  const [editing, setEditing] = useState(false);

  // =========================
  // REFRESH FROM BACKEND (OPTIONAL BUT RECOMMENDED)
  // =========================
  useEffect(() => {
    if (user.id) {
      UserService.getUserById(user.id)
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = async () => {
    try {
      await UserService.updateUser(user.id, user);

      // update localStorage (IMPORTANT FIX)
      localStorage.setItem("user", JSON.stringify(user));

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div className="profile-page">

      {/* BACK BUTTON */}
      <button
        className="back-button"
        onClick={() => window.history.back()}
      >
        ← Home
      </button>

      {/* PROFILE CARD */}
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