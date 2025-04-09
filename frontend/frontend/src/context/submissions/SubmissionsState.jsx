import React, {useState} from 'react';
import SubmissionsContext from './SubmissionsContext';
import { useAuth } from '../../context/AuthContext';

const SubmissionsState = (props) => {
    const host = "http://localhost:8080";
    const textIntial = [];
    const [text, setText] = useState(textIntial);
    const { token } = useAuth();
    //get all submissions
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

  //Delete a submission
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

//Edit a Note
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


  return (
    <SubmissionsContext.Provider value={{text, getText, deleteText, editText}}>
        {props.children}
    </SubmissionsContext.Provider>
  )
}

export default SubmissionsState
