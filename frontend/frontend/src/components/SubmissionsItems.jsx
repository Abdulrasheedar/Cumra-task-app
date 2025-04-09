import React, { useContext } from "react";
import submissionsContext from "../context/submissions/SubmissionsContext";
const SubmissionsItems = (props) => {
  const context = useContext(submissionsContext);
  const { deleteText } = context;
  const { text,note, updateText } = props;
  const id = text?.id;
  const title = text?.title;
  const content = text?.content;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{title}</h5>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={() => {
                deleteText(id);
              }}
            ></i>
            {/* ;props.showAlert("Deleted Successfully","success"); */}
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateText({id, title, content});}}></i>
          </div>
          <p className="card-text">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsItems;
