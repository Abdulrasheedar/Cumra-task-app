import React, { useContext } from "react";
import submissionsContext from "../context/submissions/SubmissionsContext";

const UserList = (props) => {
  const context = useContext(submissionsContext);
  const { getUsers } = context;
  const {users} = props;

  return (
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{users}</h5>
            <div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserList;
