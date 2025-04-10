import React, { useContext } from "react";
import submissionsContext from "../context/submissions/SubmissionsContext";
import { useAuth } from "../context/AuthContext";

const SubmissionsItems = (props) => {
  const context = useContext(submissionsContext);
  const { deleteText, deleteSubmissions } = context;
  const { text, note, updateText, onDeleteAlert,updateSubmission,username } = props;
  const { role } = useAuth();
  const id = text?.id;
  const title = text?.title;
  const content = text?.content;
  const isAdmin = role==="ROLE_ADMIN";

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
        {isAdmin && <h5 className="card-title"><b>{username}'s data</b></h5>}
          <div className="d-flex justify-content-between align-items-center">
            
            <h5 className="card-title">{title}</h5>
            <div>
              <i
                className="fa-solid fa-trash mx-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  {isAdmin ? deleteSubmissions(id) :deleteText(id);}
                  onDeleteAlert && onDeleteAlert();
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => 
                  {isAdmin ? updateSubmission({ id, title, content }) :updateText({ id, title, content }) }
                
                }
              ></i>
            </div>
          </div>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsItems;
