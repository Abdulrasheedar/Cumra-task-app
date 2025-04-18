import React, { useContext, useEffect } from "react";
import SubmissionsContext from "../context/submissions/SubmissionsContext";
import { useAuth } from "../context/AuthContext";

const ManageUsersPage = () => {
  const { role } = useAuth();
  const { users, getUsers, deleteUser, toggleAdminRole } =
    useContext(SubmissionsContext);
  const { userId } = useAuth();

  useEffect(() => {
    getUsers(); // Fetch all users when the component mounts
  }, []);

  // Handle deletion of a user
  const handleDelete = async (id) => {
    if (role === "ROLE_ADMIN") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmDelete) {
        await deleteUser(id);
        getUsers();
      }
    } else {
      alert("Only admins can delete users");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        padding: "80px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "900px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h3 className="text-center mb-4">All Registered Users</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Update Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 0 ? (
                users.map((user) => {
                  const isAdmin = user.roles.includes("ROLE_ADMIN");

                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className={`btn btn-sm ${
                            isAdmin ? "btn-secondary" : "btn-warning"
                          }`}
                          onClick={() => toggleAdminRole(user.id, user.roles)}
                          disabled={
                            user.username === localStorage.getItem("username")
                          }
                        >
                          {isAdmin ? "Demote to User" : "Promote to Admin"}
                        </button>
                      </td>
                      <td>
                        <i
                          className={`fa-solid fa-trash ${
                            user.username === localStorage.getItem("username")
                              ? "text-secondary"
                              : "text-danger"
                          }`}
                          style={{
                            cursor:
                              user.username === localStorage.getItem("username")
                                ? "not-allowed"
                                : "pointer",
                          }}
                          onClick={() => {
                            if (
                              user.username !== localStorage.getItem("username")
                            ) {
                              handleDelete(user.id);
                            }
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
