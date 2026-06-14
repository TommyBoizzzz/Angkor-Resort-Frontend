function ProfileCard({
  user,
  editing,
  setUser,
  setEditing,
  handleSave,
}) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.fullname.charAt(0).toUpperCase()}
        </div>

        <h2>{user.fullname}</h2>
      </div>

      <div className="profile-body">
        <div className="info-group">
          <label>Full Name</label>

          {editing ? (
            <input
              type="text"
              value={user.fullname}
              onChange={(e) =>
                setUser({
                  ...user,
                  fullname: e.target.value,
                })
              }
            />
          ) : (
            <h4>{user.fullname}</h4>
          )}
        </div>

        <div className="info-group">
          <label>Email</label>
          <h4>{user.email}</h4>
        </div>

        <div className="info-group">
          <label>Sex</label>

          {editing ? (
            <select
              value={user.sex}
              onChange={(e) =>
                setUser({
                  ...user,
                  sex: e.target.value,
                })
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <h4>{user.sex}</h4>
          )}
        </div>

        <div className="button-group">
          {editing ? (
            <button onClick={handleSave}>
              Save Changes
            </button>
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