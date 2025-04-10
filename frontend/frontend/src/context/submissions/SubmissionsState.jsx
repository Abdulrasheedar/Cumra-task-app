import React, {useState} from 'react';
import SubmissionsContext from './SubmissionsContext';
import { useAuth } from '../../context/AuthContext';

const SubmissionsState = (props) => {
    const host = "http://localhost:8080";
    const textIntial = [];
    const [text, setText] = useState(textIntial);
    const usersIntial =[];
    const [users, setUsers] = useState(usersIntial);
    const submissionIntial =[];
    const [submissions, setSubmissions] = useState(submissionIntial);

    const { role, token } = useAuth();

    //ADMIN's API calls
     //get all users
  const getUsers = async () => {
    //Api call
       if(role==="ROLE_ADMIN"){
         const url = `${host}/api/admin/users`;
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);
      
        let data = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        let parseData = await data.json();
        setUsers(parseData);}
  }
   //delete user by admin
   const deleteUser = async (id) =>{
    if(role==="ROLE_ADMIN"){
    const url = `${host}/api/admin/users/${id}`;
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
  
    await fetch(url, {
      method: "DELETE",
      headers: headers,
    });
    const updatedUsers = users.filter((sub) => sub.id !== id);
    setSubmissions(updatedUsers);
  }

   }
   //get all submissions
   const getSubmissions = async () => {
    //Api call
    if(role==="ROLE_ADMIN"){
        const url = `${host}/api/admin/submissions`;
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);
      
        let data = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        let parseData = await data.json();
        setSubmissions(parseData);
      }
  }
//Delete submissions by admin
const deleteSubmissions = async (id) => {
  if(role==="ROLE_ADMIN"){
  const url = `${host}/api/admin/submissions/${id}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

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
  if(role==="ROLE_ADMIN"){
  const url = `${host}/api/admin/submissions/${id}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");

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

// Promote a user to admin (role_id = 2)
const promoteToAdmin = async (userId) => {
  if (role === "ROLE_ADMIN") {
    const url = `${host}/api/admin/users/roles/${userId}`;
    const headers = new Headers();
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    const body = JSON.stringify({
      roleIds: [2], // 2 = ROLE_ADMIN
    });

    let response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: body,
    });

    let result = await response.text(); // or .json() if response is JSON
    console.log("Promote response: ", result);

    // Update user in local state (optional: you can also call getUsers())
    const updatedUsers = JSON.parse(JSON.stringify(users));
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].id === userId) {
        updatedUsers[i].roles.push("ROLE_ADMIN");
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
        const url = `${host}/api/user/submissions`;
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);
      
        let data = await fetch(url, {
          method: "GET",
          headers: headers,
        });
        let parseData = await data.json();
        setText(parseData);
  }

//Update a submission
const editText = async (id, title, content) => {
  //Api call
  const url = `${host}/api/user/submissions/${id}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");  // Set the content type to JSON
  const body = JSON.stringify({title, content});
  let data = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: body 
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
const deleteText = async(id) => {

  const url = `${host}/api/user/submissions/${id}`;
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/json");  

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
    <SubmissionsContext.Provider value={{text, getText, 
    deleteText, editText, getUsers, users, submissions,
     getSubmissions, deleteSubmissions,editSubmission, deleteUser, promoteToAdmin}}>
        {props.children}
    </SubmissionsContext.Provider>
  )
}

export default SubmissionsState
