import React, { useState } from "react";
import SubmissionsContext from "./SubmissionsContext";
import { useAuth } from "../../context/AuthContext";
import { getAuthHeaders } from "../../utils/AuthHeaders";

const SubmissionsState = (props) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  // Local state variables for managing different datasets
  const [text, setText] = useState([]);
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  // Extracting role and token from Auth context
  const { role, token } = useAuth();
  const headers = getAuthHeaders(token);
  const isAdmin = role === "ROLE_ADMIN";

  // =================== ADMIN OPERATIONS ===================

  //Fetch all users (admin only)
  const getUsers = async () => {
    if (isAdmin) {
      const url = `${baseURL}/admin/users`;
      let data = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      let parseData = await data.json();
      setUsers(parseData);
    }
  };
  // Delete a user by ID (admin only)
  const deleteUser = async (id) => {
    if (isAdmin) {
      const url = `${baseURL}/admin/users/${id}`;
      await fetch(url, {
        method: "DELETE",
        headers: headers,
      });
      const updatedUsers = users.filter((sub) => sub.id !== id);
      setSubmissions(updatedUsers);
    }
  };

  // Fetch all submissions (admin only)
  const getSubmissions = async () => {
    if (isAdmin) {
      const url = `${baseURL}/admin/submissions`;
      let data = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      let parseData = await data.json();
      setSubmissions(parseData);
    }
  };

  // Delete a submission by ID (admin only)
  const deleteSubmissions = async (id) => {
    if (isAdmin) {
      const url = `${baseURL}/admin/submissions/${id}`;
      await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      const updatedSubmissions = submissions.filter((sub) => sub.id !== id);
      setSubmissions(updatedSubmissions);
    }
  };

  // Update a submission by ID (admin only)
  const editSubmission = async (id, title, content) => {
    if (isAdmin) {
      const url = `${baseURL}/admin/submissions/${id}`;
      const body = JSON.stringify({ title, content });
      let data = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      let parseData = await data.json();
      console.log(parseData);

      let updatedSubmissions = JSON.parse(JSON.stringify(submissions));

      for (let index = 0; index < updatedSubmissions.length; index++) {
        if (updatedSubmissions[index].id === id) {
          updatedSubmissions[index].title = title;
          updatedSubmissions[index].content = content;
          break;
        }
      }

      setSubmissions(updatedSubmissions);
    }
  };

  // Promote/Demote a user between ROLE_ADMIN and ROLE_USER
  const toggleAdminRole = async (userId, currentRoles) => {
    if (role === "ROLE_ADMIN") {
      const isAdmin = currentRoles.includes("ROLE_ADMIN");
      const newRoleIds = isAdmin ? [1] : [2]; // 1 = ROLE_USER, 2 = ROLE_ADMIN

      const url = `${baseURL}/admin/users/roles/${userId}`;
      const body = JSON.stringify({ roleIds: newRoleIds });

      const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: body,
      });

      const result = await response.text();
      console.log("Toggle role response:", result);

      // Optional: update local state instead of refetching
      let updatedUsers = JSON.parse(JSON.stringify(users));
      for (let i = 0; i < updatedUsers.length; i++) {
        if (updatedUsers[i].id === userId) {
          updatedUsers[i].roles = isAdmin ? ["ROLE_USER"] : ["ROLE_ADMIN"];
          break;
        }
      }

      setUsers(updatedUsers);
    }
  };

  // =================== USER OPERATIONS ===================

  // Get submissions by logged-in user
  const getText = async () => {

    const url = `${baseURL}/user/submissions`;
    let data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    let parseData = await data.json();
    setText(parseData);
  };

  // Update a user's own submission
  const editText = async (id, title, content) => {
    //Api call
    const url = `${baseURL}/user/submissions/${id}`;
    const body = JSON.stringify({ title, content });
    let data = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body,
    });
    let parseData = await data.json();
    console.log(parseData);
    let newNotes = JSON.parse(JSON.stringify(text));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element.id === id) {
        newNotes[index].title = title;
        newNotes[index].content = content;
        break;
      }
    }
    setText(newNotes);
  };

  // Delete a user's own submission
  const deleteText = async (id) => {
    const url = `${baseURL}/user/submissions/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: headers,
    });

    const newTexts = text.filter((text) => {
      return text.id !== id;
    });
    setText(newTexts);
  };
  // Provide all context values to children components
  return (
    <SubmissionsContext.Provider
      value={{
        text,
        getText,
        deleteText,
        editText,
        getUsers,
        users,
        submissions,
        getSubmissions,
        deleteSubmissions,
        editSubmission,
        deleteUser,
        toggleAdminRole,
      }}
    >
      {props.children}
    </SubmissionsContext.Provider>
  );
};

export default SubmissionsState;
