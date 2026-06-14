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

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "GUEST",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [editUser, setEditUser] = useState({
    id: "",
    username: "",
    email: "",
    role: "GUEST",
    phoneNumber: "",
    dateOfBirth: "",
  });

  // =========================
  // LOAD USERS
  // =========================
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // ADD USER
  // =========================
  const handleAdd = async () => {
    try {
      await createUser(newUser);
      setShowAdd(false);
      setNewUser({
        username: "",
        email: "",
        password: "",
        role: "GUEST",
        phoneNumber: "",
        dateOfBirth: "",
      });
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // =========================
  // OPEN EDIT
  // =========================
  const openEdit = (user) => {
    setEditUser(user);
    setShowEdit(true);
  };

  // =========================
  // UPDATE USER
  // =========================
  const handleUpdate = async () => {
    try {
      await updateUser(editUser.id, editUser);
      setShowEdit(false);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <div>
      <h1 className="db-title">Users</h1>

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

        <button className="add-btn" onClick={() => setShowAdd(true)}>
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => openEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="modal-overlay">
          <div className="modal colorful-modal">
            <h2>➕ Add User</h2>

            <input
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              value={newUser.phoneNumber}
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
            />

            <input
              type="date"
              value={newUser.dateOfBirth}
              onChange={(e) =>
                setNewUser({ ...newUser, dateOfBirth: e.target.value })
              }
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="GUEST">GUEST</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="modal-actions">
              <button onClick={() => setShowAdd(false)}>Cancel</button>
              <button onClick={handleAdd}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="modal-overlay">
          <div className="modal colorful-modal">
            <h2>✏ Edit User</h2>

            <input
              value={editUser.username}
              onChange={(e) =>
                setEditUser({ ...editUser, username: e.target.value })
              }
            />

            <input
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <input
              value={editUser.phoneNumber || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, phoneNumber: e.target.value })
              }
            />

            <input
              type="date"
              value={editUser.dateOfBirth || ""}
              onChange={(e) =>
                setEditUser({ ...editUser, dateOfBirth: e.target.value })
              }
            />

            <select
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="GUEST">GUEST</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <div className="modal-actions">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { AdminGuests };