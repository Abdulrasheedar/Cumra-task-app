import React, { useContext, useEffect, useState, useRef } from "react";
import SubmissionsItems from "../components/SubmissionsItems";
import SubmissionsContext from "../context/submissions/SubmissionsContext";

const ViewSubmissionsPage = () => {
  const { text, getText, editText } = useContext(SubmissionsContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const[note,setNote]= useState({id:"",etitle:"",econtent:""});
  useEffect(() => {
    getText();
  }, []);
  const updateText = (currentText) => {
    ref.current.click();
    setNote({id:currentText.id,etitle: currentText.title,econtent:currentText.content});

  };
  const handleClick = (e)=>{
    editText(note.id,note.etitle,note.econtent)
    // e.preventDefault();
    refClose.current.click();
    // props.showAlert("Updated Successfully","success");
  }

  const onChange = (e)=>{
        setNote({...note,[e.target.name]: e.target.value});
  }
  return (
    <>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
     <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle" value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange} minLength={5} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="econtent" className="form-label">
                    Content
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="econtent"
                    name="econtent" value={note.econtent}
                    onChange={onChange} minLength={5} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5||note.econtent.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    <div className="col-12 d-flex flex-column align-items-center mt-5">
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>All Submission</h1>
        <div className="row">
          {text.map((sub) => {
            return (
              <div key={sub.id}>
                <SubmissionsItems text={sub} updateText={updateText} note = {note}/>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default ViewSubmissionsPage;
