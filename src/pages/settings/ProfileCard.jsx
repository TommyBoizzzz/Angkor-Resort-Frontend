function ProfileCard({
  user,
  editing,
  setUser,
  setEditing,
  handleSave,
}) {
  return (
    <div className="profile-card">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-avatar">
          {(user.username || "?").charAt(0).toUpperCase()}
        </div>

        <h2>{user.username}</h2>
      </div>

      <div className="profile-body">

        {/* USERNAME */}
        <div className="info-group">
          <label>Username</label>

          {editing ? (
            <input
              value={user.username || ""}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
            />
          ) : (
            <h4>{user.username || "-"}</h4>
          )}
        </div>

        {/* EMAIL (READ ONLY) */}
        <div className="info-group">
          <label>Email</label>
          <h4>{user.email || "-"}</h4>
        </div>

        {/* PHONE */}
        <div className="info-group">
          <label>Phone Number</label>

          {editing ? (
            <input
              value={user.phoneNumber || ""}
              onChange={(e) =>
                setUser({ ...user, phoneNumber: e.target.value })
              }
            />
          ) : (
            <h4>{user.phoneNumber || "-"}</h4>
          )}
        </div>

        {/* DOB */}
        <div className="info-group">
          <label>Date of Birth</label>

          {editing ? (
            <input
              type="date"
              value={user.dateOfBirth || ""}
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
            />
          ) : (
            <h4>{user.dateOfBirth || "-"}</h4>
          )}
        </div>

        {/* BUTTONS */}
        <div className="button-group">

          {editing ? (
            <>
              <button onClick={handleSave}>
                Save Changes
              </button>

              <button onClick={() => setEditing(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default ProfileCard;