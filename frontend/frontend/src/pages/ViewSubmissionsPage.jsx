import React, { useContext, useEffect, useState, useRef } from "react";
import SubmissionsItems from "../components/SubmissionsItems";
import SubmissionsContext from "../context/submissions/SubmissionsContext";
import { useAuth } from "../context/AuthContext";

const ViewSubmissionsPage = () => {
  // Extract API methods and state from context
  const {
    text,
    getText,
    editText,
    getSubmissions,
    submissions,
    editSubmission,
    getUsers,
    users,
  } = useContext(SubmissionsContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", econtent: "" });
  const [submission, setSubmission] = useState({
    id: "",
    etitle: "",
    econtent: "",
  });
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const { role } = useAuth();
// Fetch all required data on component mount
  useEffect(() => {
    getUsers();
    getText();
    getSubmissions();
  }, []);
  // Prepare user submission data for editing (for ROLE_USER)
  const updateText = (currentText) => {
    ref.current.click();
    setNote({
      id: currentText.id,
      etitle: currentText.title,
      econtent: currentText.content,
    });
  };
 // Prepare admin submission data for editing
  const updateSubmission = (currentText) => {
    ref.current.click();
    setSubmission({
      id: currentText.id,
      etitle: currentText.title,
      econtent: currentText.content,
    });
  };

  // Handle submission update (admin or user)
  const handleClick = () => {
    if (role === "ROLE_ADMIN") {
      editSubmission(submission.id, submission.etitle, submission.econtent);
    } else {
      editText(note.id, note.etitle, note.econtent);
    }

    refClose.current.click();
    triggerUpdateAlert();
  };

   // Handle input change for both user/admin update
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    setSubmission({ ...submission, [e.target.name]: e.target.value });
  };

  // Show delete alert for 3 seconds
  const triggerDeleteAlert = () => {
    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 3000);
  };
  // Show update alert for 3 seconds
  const triggerUpdateAlert = () => {
    setShowUpdateAlert(true);
    setTimeout(() => setShowUpdateAlert(false), 3000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
    style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#f8f9fa",
      padding: "80px",
      boxSizing: "border-box",
      marginBottom:'2500px'
    }}>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Submission
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                    name="etitle"
                    value={role=="ROLE_ADMIN"? submission.etitle:note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
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
                    name="econtent"
                    value={role=="ROLE_ADMIN"?submission.econtent:note.econtent}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.econtent.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Submission
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 d-flex flex-column align-items-center mt-5">
        {showDeleteAlert && (
          <div className="alert alert-success w-50 text-center" role="alert">
            Submission deleted successfully!
          </div>
        )}
        {showUpdateAlert && (
          <div className="alert alert-info w-50 text-center" role="alert">
            Submission updated successfully!
          </div>
        )}
        <div className="mt-5"></div>
        <h1>All Submissions</h1>
        <div
          className="row justify-content-center w-100"
          style={{ padding: "40px" }}
        >
          {role === "ROLE_ADMIN"
            ? submissions.map((sub) => {
                let username = "Unknown";
                for (let i = 0; i < users.length; i++) {
                  if (users[i].id === sub.user_id) {
                    username = users[i].username;
                    break;
                  }
                }
                return (
                  <SubmissionsItems
                    key={sub.id}
                    text={sub}
                    updateSubmission={updateSubmission}
                    username={username}
                    onDeleteAlert={triggerDeleteAlert}
                  />
                );
              })
            : text.map((sub) => (
                <SubmissionsItems
                  key={sub.id}
                  text={sub}
                  updateText={updateText}
                  note={note}
                  onDeleteAlert={triggerDeleteAlert}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissionsPage;
