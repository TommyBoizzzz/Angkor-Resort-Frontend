import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

function AdminGuests() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // EDIT STATE
  // =========================
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  // =========================
  // FETCH USERS
  // =========================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // DELETE USER
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleEditClick = (user) => {
    setEditUser(user);
    setForm({
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "GUEST",
      phoneNumber: user.phoneNumber || "",
      dateOfBirth: user.dateOfBirth || "",
    });
  };

  // =========================
  // HANDLE FORM CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // UPDATE USER
  // =========================
  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editUser.id}`, form);

      setUsers(
        users.map((u) =>
          u.id === editUser.id ? { ...u, ...form } : u
        )
      );

      setEditUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="db-container">
      <h1 className="db-title">Guests</h1>

      <div className="db-card">
        <h3>Guest Management</h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="db-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEditClick(u)}>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(u.id)}
                      style={{ marginLeft: 10, color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}
      {editUser && (
        <div className="modal-overlay">
          <div className="modal">

            {/* TITLE */}
            <h2>Edit User #{editUser.id}</h2>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />

            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password (optional)"
              type="password"
            />

            {/* ROLE FILTER (ADMIN / GUEST) */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="role-select"
            >
              <option value="ADMIN">ADMIN</option>
              <option value="GUEST">GUEST</option>
            </select>

            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              type="date"
            />

            {/* BUTTONS */}
            <div className="modal-actions">
              <button onClick={handleUpdate} className="btn-save">
                Save
              </button>

              <button
                onClick={() => setEditUser(null)}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export { AdminGuests };