import React, { useContext } from "react";
import submissionsContext from "../context/submissions/SubmissionsContext";
import { useAuth } from "../context/AuthContext";

const SubmissionsItems = (props) => {
  // Access context methods for submission handling
  const context = useContext(submissionsContext);
  const { deleteText, deleteSubmissions } = context;
  // Props received from parent component
  const { text, updateText, onDeleteAlert,updateSubmission,username } = props;
  const { role } = useAuth();

  // Destructure submission data
  const id = text?.id;
  const title = text?.title;
  const content = text?.content;
  const isAdmin = role==="ROLE_ADMIN";

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
        {/* Display user's name only if admin is viewing */}
        {isAdmin && <h5 className="card-title"><b>{username}'s data</b></h5>}
          <div className="d-flex justify-content-between align-items-center">
            {/* Submission Title */}
            <h5 className="card-title">{title}</h5>
            <div>
              {/* Trash icon for delete functionality */}
              <i
                className="fa-solid fa-trash mx-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // Admin deletes from global submissions, user deletes their own
                  {isAdmin ? deleteSubmissions(id) :deleteText(id);}
                  onDeleteAlert && onDeleteAlert();
                }}
              ></i>
              {/* Edit icon for updating submission */}
              <i
                className="fa-solid fa-pen-to-square mx-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => 
                  // Admin updates global submissions, user updates their own
                  {isAdmin ? updateSubmission({ id, title, content }) :updateText({ id, title, content }) }
                
                }
              ></i>
            </div>
          </div>
          {/* Submission Content */}
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsItems;
