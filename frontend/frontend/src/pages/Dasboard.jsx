import React, { useContext, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SubmissionsContext from "../context/submissions/SubmissionsContext";

const Dashboard = () => {
  const { role, username } = useAuth();
  const navigate = useNavigate();
  const { text, getText, getUsers, users, getSubmissions, submissions } =
    useContext(SubmissionsContext);
   
  // Fetch data once component mounts  
  useEffect(() => {
    getText(); // Get logged-in user's submissions
    getUsers(); // Get all users (for admin)
    getSubmissions(); // Get all submissions (for admin)
  }, []);
  return (
    <div
      style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#f8f9fa" }}
    >
      {role === "ROLE_ADMIN" ? (
        <>
        {/* Admin Dashboard Welcome Section */}
          <div
            className="py-4"
            style={{ padding: "100px", marginTop: "120px" }}
          >
            <h2>
              Welcome to your Admin Dashboard, <b>{username}</b>!
            </h2>
          </div>
          {/* Admin Stats Cards */}
          <div className="container text-center">
            <div className="d-flex gap-4 mb-4 flex-wrap">
              <Card className="text-center p-4" style={{ width: "500px" }}>
                <h5>Total Users</h5>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontSize: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {users.length}
                </div>
              </Card>

              <Card className="text-center p-4" style={{ width: "500px" }}>
                <h5>Total Submissions</h5>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontSize: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {submissions.length}
                </div>
              </Card>
            </div>

            {/* Admin Users Table */}
            <div className="mt-5"></div>
            <div className="mt-5">
              <h3>All Registered Users</h3>
              <table className="table table-bordered mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
        {/* Regular User Dashboard */}
          <div
            className="py-4"
            style={{ padding: "100px", marginTop: "120px" }}
          ></div>
          <div className="container ">
            <div className="d-flex gap-4 mb-4 flex-wrap">
              <h2>
                Welcome to your Dashboard, <b>{username}</b>!
              </h2>
              {/* User Submission Count */}
              <Card className="text-center p-4" style={{ width: "1000px" }}>
                <h5>Total Submissions</h5>
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontSize: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  {text.length}
                </div>
              </Card>
            </div>
            {/* Button to Submit New Entry */}        
            <Button
              style={{
                width: "300px",
                padding: "16px 24px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
              variant="success"
              onClick={() => navigate("/submissions")}
            >
              Submit New Data
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
