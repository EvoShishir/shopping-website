import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import "./Users.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import client from "../../../client/client"; // Assuming this is your API client

const Users = () => {
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user.role]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data } = await client.get("/users/get-users");
    setUsers(data.users);
  };

  const getNewRole = (newRole, userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await client.put(`/users/update-role/${userId}`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <>
      {admin ? (
        <div className="all-users">
          <AdminSidebar />
          <div className="users-container">
            <div className="user-table">
              <h3>User ID</h3>
              <h3>Full Name</h3>
              <h3>Email</h3>
              <h3>Role</h3>
            </div>
            <div>
              {users.map((user, key) => (
                <div className="single-user" key={key}>
                  <p>{user._id}</p>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <select
                    className="role-select"
                    value={user.role}
                    onChange={(e) => getNewRole(e.target.value, user._id)} // Update role in the local state
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button
                    className="go-back-btn"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    Update Role
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>You do not have permission to view this page</h1>
          <Link to={"/"}>Go back</Link>
        </div>
      )}
    </>
  );
};

export default Users;
