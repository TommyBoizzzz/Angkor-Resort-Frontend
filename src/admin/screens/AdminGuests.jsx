import { useEffect, useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../Service/UserService";

function AdminGuests() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [showDialog, setShowDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [userData, setUserData] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "GUEST",
    phoneNumber: "",
    dateOfBirth: "",
  });

  // =========================
  // LOAD USERS
  // =========================
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  // =========================
  // OPEN ADD
  // =========================
  const openAddDialog = () => {
    setIsEdit(false);
    setUserData({
      id: null,
      username: "",
      email: "",
      password: "",
      role: "GUEST",
      phoneNumber: "",
      dateOfBirth: "",
    });
    setShowDialog(true);
  };

  // =========================
  // EDIT USER (FIXED)
  // =========================
  const handleEdit = (user) => {
    setIsEdit(true);
    setUserData({
      id: user.id,
      username: user.username || "",
      email: user.email || "",
      password: "", // do not preload password
      role: user.role || "GUEST",
      phoneNumber: user.phoneNumber || "",
      dateOfBirth: user.dateOfBirth || "",
    });
    setShowDialog(true);
  };

  // =========================
  // SAVE (CREATE / UPDATE)
  // =========================
  const handleSave = async () => {
    if (!userData.username || !userData.email) {
      alert("Please fill required fields");
      return;
    }

    try {
      if (isEdit) {
        await updateUser(userData.id, {
          username: userData.username,
          email: userData.email,
          role: userData.role,
          phoneNumber: userData.phoneNumber,
          dateOfBirth: userData.dateOfBirth,
        });
      } else {
        await createUser(userData);
      }

      setShowDialog(false);
      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      (u.username || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "all" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <>
      <h1 className="db-title">Users Management</h1>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="left-actions">
          <input
            className="search-input"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="ADMIN">ADMIN</option>
            <option value="GUEST">GUEST</option>
          </select>
        </div>

        <button className="add-btn" onClick={openAddDialog}>
          + Add User
        </button>
      </div>

      {/* TABLE */}
      <div className="db-table-box">
        <table className="db-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.dateOfBirth}</td>

                  <td style={actionStyle}>
                    <button onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showDialog && (
        <div
          className="modal-overlay"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="modal colorful-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{isEdit ? "✏️ Edit User" : "➕ Add User"}</h2>

            <input
              placeholder="Username"
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />

            {!isEdit && (
              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
              />
            )}

            <input
              placeholder="Phone"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  phoneNumber: e.target.value,
                })
              }
            />

            <input
              type="date"
              value={userData.dateOfBirth}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  dateOfBirth: e.target.value,
                })
              }
            />

            <select
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
            >
              <option value="GUEST">GUEST</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>

              <button className="btn-save" onClick={handleSave}>
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const actionStyle = {
  display: "flex",
  gap: "8px",
  justifyContent: "center",
};

export { AdminGuests };