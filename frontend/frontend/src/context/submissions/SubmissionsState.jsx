import React, { useState } from "react";
import SubmissionsContext from "./SubmissionsContext";
import { useAuth } from "../../context/AuthContext";
import { getAuthHeaders } from "../../utils/AuthHeaders";

const SubmissionsState = (props) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const textIntial = [];
  const [text, setText] = useState(textIntial);
  const usersIntial = [];
  const [users, setUsers] = useState(usersIntial);
  const submissionIntial = [];
  const [submissions, setSubmissions] = useState(submissionIntial);
  const { role, token } = useAuth();
  const headers = getAuthHeaders(token);
  const isAdmin = role === "ROLE_ADMIN";

  //ADMIN's API calls
  //get all users
  const getUsers = async () => {
    //Api call
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
  //delete user by admin
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
  //get all submissions
  const getSubmissions = async () => {
    //Api call
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
  //Delete submissions by admin
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

  //Edit a submission by admin
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

      // Update local state (optional: you can just call getUsers instead)
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

  //USERS's API calls
  //get all user submissions
  const getText = async () => {
    //Api call
    const url = `${baseURL}/user/submissions`;
    let data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    let parseData = await data.json();
    setText(parseData);
  };

  //Update a submission
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

  //Delete a user submission
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
